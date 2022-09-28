// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useEffect, useState } from "react";

// Types
import { LoginConfirmResponse, AuthTokenType } from "../../types/request";
import { ProfileType } from "../../types/profile";

// Requests
import loginConfirm from "../../proxies/auth/confirmLogin";
import transformToRequestError from "../../proxies/utils/transformToRequestError";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreIdentifiers from "../../config/StoreIdentifiers";

// Auth
import { setDefaultAuthHeader } from "../../proxies/instances/apiInstance";
import { refreshToken } from "../../proxies/utils/authToken";

// Debug
import { generateProfile } from "../FakeDataContext/fakeDataGenerators";
import Logger from "../../utils/Logger";

// Define what the auth context contains
interface AuthContextType {
    user: ProfileType;
    setUser: React.Dispatch<React.SetStateAction<ProfileType>>;

    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    authToken: AuthTokenType;
    setAuthToken: React.Dispatch<React.SetStateAction<AuthTokenType>>;

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
    const [authToken, setAuthToken] = useState<AuthTokenType>(null!);

    /**
     * Makes a request to the back-end using the third party provided
     * code. The expected return value is a user as well as a bool
     * indicating whether to create a user or not.
     */
    const signIn = async (code: string): Promise<LoginConfirmResponse> => {
        try {
            const loginConfirmResp = await loginConfirm(code);

            const { authToken, profile } = loginConfirmResp;

            setItem(StoreIdentifiers.authToken, authToken);
            setDefaultAuthHeader(authToken);

            if (profile !== null) {
                setUser(profile);
                setLoggedIn(true);
            }

            return Promise.resolve(loginConfirmResp);
        } catch (err: any) {
            return Promise.reject(transformToRequestError(err));
        }
    };

    useEffect(() => {
        const setToken = async () => {
            const token = getItem<AuthTokenType>(StoreIdentifiers.authToken);
            if (token) {
                try {
                    const newJWT = await refreshToken(token);

                    Logger("AUTH", "Auth context", "Newly generated jwt", null);

                    setUser(generateProfile(1)[0]);
                    setItem(StoreIdentifiers.authToken, newJWT);
                    setDefaultAuthHeader(token);
                    setLoggedIn(true);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        setToken();
    }, []);

    const value: AuthContextType = {
        user,
        signIn,
        setUser,
        setLoggedIn,
        isLoggedIn,
        authToken,
        setAuthToken
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
