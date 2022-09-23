// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";

// Types
import { LoginConfirmResponse, AuthTokenType } from "../../types/request";
import { ProfileType } from "../../types/profile";

// Requests
import loginConfirm from "../../proxies/auth/confirmLogin";
import transformToRequestError from "../../proxies/utils/transformToRequestError";

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
     * Makes a request to the back-end using the intra code. The expected
     * return value is a user as well as a bool indicating whether to
     * create a user or not.
     */
    const signIn = async (code: string): Promise<LoginConfirmResponse> => {
        try {
            const res = await loginConfirm(code);

            const { authToken, profile } = res;

            setAuthToken(authToken);

            if (profile !== null) {
                setUser(profile);
                setLoggedIn(true);
            }

            return Promise.resolve(res);
        } catch (err: any) {
            return Promise.reject(transformToRequestError(err));
        }
    };

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
