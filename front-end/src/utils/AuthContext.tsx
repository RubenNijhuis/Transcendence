// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";

// Types
import { LoginConfirmResponse, Profile, RequestError } from "./GlobalTypes";

// Requests
import loginConfirm from "../proxies/auth/confirmLogin";

// Define what the auth context contains
interface AuthContextType {
    user: Profile;
    setUser: React.Dispatch<React.SetStateAction<Profile>>;

    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    authToken: string;
    signIn(code: string): any;
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
    const [user, setUser] = useState<Profile>(null!);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string>(null!);

    /**
     * Makes a request to the back-end using the intra code. The expected
     * return value is a user as well as a bool indicating whether to
     * create a user or not.
     */
    const signIn = async (
        code: string
    ): Promise<LoginConfirmResponse | RequestError> => {
        try {
            const res = (await loginConfirm(code)) as LoginConfirmResponse;

            setAuthToken(res.authToken);

            if (res.profile !== null) {
                setUser(res.profile);
                setLoggedIn(true);
            }

            return res;
        } catch (err) {
            return err as RequestError;
        }
    };

    const value = {
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
