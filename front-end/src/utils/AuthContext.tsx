// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";
import { Profile } from "./GlobalTypes";
import { generateProfile } from "./randomData";

// Requests
import Axios from "axios";

// Define what the auth context contains
interface AuthContextType {
    user: Profile | null;
    setUser: React.Dispatch<React.SetStateAction<Profile | null>>;

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
    const [user, setUser] = useState<Profile | null>(null!);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string>(null!);

    /**
     * Makes a request to the back-end using the intra code. The expected
     * return value is a user as well as a bool indicating whether to
     * create a user or not.
     */
    const signIn = (code: string) => {
        return new Promise((resolve, reject) => {
            // TODO: use .env for url
            const url = `/api/auth/confirm?token=${code}`;

            interface AuthResponse {
                shouldCreateUser: boolean;
                user: null | Profile;
                authToken: string;
            }

            Axios.get(url).then(({ data }: { data: AuthResponse }) => {
                setAuthToken(data.authToken);
                setUser(data.user);
                resolve(data);
            });
        });
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
