// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// API
import loginConfirm from "../../proxies/auth/confirmLogin";
import getUserByAccessToken from "../../proxies/user/getUserByAccessToken";
import { refreshAuthToken } from "../../proxies/auth/refreshToken";
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";

// Routing
import PageRoutes from "../../config/PageRoutes";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Types
import { ProfileType } from "../../types/profile";

// Debug
import Logger from "../../utils/Logger";

interface AuthContextType {
    user: ProfileType;
    setUser: React.Dispatch<React.SetStateAction<ProfileType>>;

    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    signIn(code: string): Promise<boolean>;
}

// Create the context
const AuthContext = createContext<AuthContextType>(null!);

// Shorthand to use auth as a hook
const useAuth = () => useContext(AuthContext);

/**
 * The authprovider creates a "bucket" in which we can store all
 * the user data as well as the utility functions like login and logout
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<ProfileType>(null!);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    /**
     * Makes a request to the back-end using the third party provided
     * code. The expected return value is a user as well as a bool
     * indicating whether to create a user or not.
     */
    const signIn = async (code: string): Promise<boolean> => {
        try {
            const { authToken, profile, shouldCreateUser } = await loginConfirm(
                code
            );

            // Destructuring the return value
            const { accessToken, refreshToken } = authToken;

            // Reset the store and update the API instance
            setItem(StoreId.accessToken, accessToken);
            setItem(StoreId.refreshToken, refreshToken);
            setDefaultAuthHeader(accessToken);

            if (profile !== null) {
                setUser(profile);
                setLoggedIn(true);
            }

            return Promise.resolve(shouldCreateUser);
        } catch (err) {
            Logger("AUTH", "Auth context", "Error in singIn", err);
            return Promise.reject(err);
        }
    };

    /**
     * Checks if there is still an auth token in the store.
     * If there is still one we check it's validity and change
     * the auth state accordingly.
     * If the refresh token is also expired we ask the user
     * to manually log in
     */
    // TODO: sign in function and this use effect share a lot of code - reduce duplication
    useEffect(() => {
        const setToken = async () => {
            const storeRefreshToken = getItem<string>(StoreId.refreshToken);

            if (storeRefreshToken !== null) {
                try {
                    const { accessToken, refreshToken } =
                        await refreshAuthToken(storeRefreshToken);

                    // Reset tokens and API instance
                    setItem(StoreId.accessToken, accessToken);
                    setItem(StoreId.refreshToken, refreshToken);
                    setDefaultAuthHeader(accessToken);

                    if (user === null) {
                        const userFromToken = await getUserByAccessToken(
                            accessToken
                        );
                        console.log(userFromToken);
                        setUser(userFromToken);
                    }

                    setLoggedIn(true);
                } catch (err) {
                    console.error(err);
                    // Reroute the user to a page where they can manually log in
                    if (window.location.pathname !== PageRoutes.home) {
                        window.location.assign(PageRoutes.home);
                    }
                }
            }
        };
        setToken();
    });

    const value: AuthContextType = {
        user,
        signIn,
        setUser,
        setLoggedIn,
        isLoggedIn
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
