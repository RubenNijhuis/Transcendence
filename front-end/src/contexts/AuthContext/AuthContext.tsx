// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { LoginConfirmResponse, AuthTokenType } from "../../types/request";
import { ProfileType } from "../../types/profile";

// API
import loginConfirm from "../../proxies/auth/confirmLogin";
import getUserByAuthToken from "../../proxies/user/getUserByAuthToken";

// Auth
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";
import { refreshAuthToken } from "../../proxies/auth/refreshToken";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreIdentifiers from "../../config/StoreIdentifiers";

// Debug
import Logger from "../../utils/Logger";
import { generateProfile } from "../FakeDataContext/fakeDataGenerators";

interface AuthContextType {
    user: ProfileType;
    setUser: React.Dispatch<React.SetStateAction<ProfileType>>;

    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    signIn(code: string): Promise<LoginConfirmResponse>;
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
    const signIn = async (code: string): Promise<LoginConfirmResponse> => {
        try {
            const loginConfirmResp = await loginConfirm(code);

            const { authToken, profile } = loginConfirmResp;

            Logger(
                "AUTH",
                "Auth context",
                "login confirm resp",
                loginConfirmResp
            );

            setItem(StoreIdentifiers.authToken, authToken);
            setDefaultAuthHeader(authToken);

            if (profile !== null) {
                setUser(profile);
                setLoggedIn(true);
            }

            return Promise.resolve(loginConfirmResp);
        } catch (err) {
            Logger("AUTH", "Auth context", "Error in singIn", err);
            return Promise.reject(err);
        }
    };

    /**
     * Checks if there is still an auth token in the store.
     * If there is still one we check it's validity and change
     * the auth state accordingly
     */
    useEffect(() => {
        const setToken = async () => {
            const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);

            if (token !== null) {
                try {
                    const newJWT = await refreshAuthToken(token);
                    setItem(StoreIdentifiers.authToken, newJWT);
                    setDefaultAuthHeader(token);

                    
                    const userFromJWT = await getUserByAuthToken(newJWT);
                    setUser(userFromJWT);
                    setLoggedIn(true);
                    console.log(userFromJWT);
                } catch (err) {
                    // TODO: setup faulty refresh token case
                    Logger(
                        "AUTH",
                        "Auth context",
                        "Refresh token issue or get user",
                        err
                    );
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
