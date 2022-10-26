// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// API
import { confirmLogin } from "../../proxies/auth";
import { getUserByAccessToken } from "../../proxies/user";

import { refreshAuthToken } from "../../proxies/auth";
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";

// Routing
import PageRoutes from "../../config/PageRoutes";

// Store
import { clearAll, getItem, removeItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Types
import { useUser } from "../UserContext";

///////////////////////////////////////////////////////////

interface AuthContextType {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    signIn(code: string): Promise<boolean>;
    signOut(): any;
}

// Create the context
const AuthContext = createContext<AuthContextType>(null!);

// Shorthand to use auth as a hook
const useAuth = () => useContext(AuthContext);

///////////////////////////////////////////////////////////

/**
 * The authprovider creates a "bucket" in which we can store all
 * the user data as well as the utility functions like login and logout
 */
const AuthProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const { user, setUser } = useUser();

    ////////////////////////////////////////////////////////////

    /**
     * Makes a request to the back-end using the third party provided
     * code. The expected return value is a user as well as a bool
     * indicating whether to create a user or not.
     */
    const signIn = async (code: string): Promise<boolean> => {
        try {
            const loginResponse = await confirmLogin(code);
            const { authToken, profile, shouldCreateUser } = loginResponse;
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
            console.log(err);
            return Promise.reject(err);
        }
    };

    /**
     * Signs the user off, removing auth tokens and
     * redirecting to the home page
     */
    const signOut = (): void => {
        removeItem(StoreId.accessToken);
        removeItem(StoreId.refreshToken);
        redirectToHome();
    };

    const redirectToHome = (): void => {
        if (window.location.pathname === PageRoutes.home) return;

        window.location.assign(PageRoutes.home);
    };

    ////////////////////////////////////////////////////////////

    /**
     * Checks if there is still an auth token in the store.
     * If there is still one we check it's validity and change
     * the auth state accordingly.
     * If the refresh token is also expired we ask the user
     * to manually log in by redirecting them to home
     */
    // TODO: sign in function and this use effect share a lot of code - reduce duplication
    useEffect(() => {
        const setToken = async () => {
            const storeRefreshToken = getItem<string>(StoreId.refreshToken);

            if (storeRefreshToken === null) return;

            try {
                // Reset for login process
                setItem(StoreId.loginProcess, false);

                const { accessToken, refreshToken } = await refreshAuthToken(
                    storeRefreshToken
                );

                // Reset tokens and API instance
                setItem(StoreId.accessToken, accessToken);
                setItem(StoreId.refreshToken, refreshToken);
                setDefaultAuthHeader(accessToken);

                if (user === null) {
                    const userFromToken = await getUserByAccessToken(
                        accessToken
                    );

                    setUser(userFromToken);
                }

                setLoggedIn(true);
            } catch (err) {
                // TODO: namespace store functions
                clearAll();
                console.error(err);
            }
        };
        setToken();
    });

    ////////////////////////////////////////////////////////////

    const value: AuthContextType = {
        signIn,
        signOut,

        isLoggedIn,
        setLoggedIn
    };

    ////////////////////////////////////////////////////////////

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
