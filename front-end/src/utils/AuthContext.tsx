// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";
import { Profile } from "./GlobalTypes";
import { generateProfile } from "./randomData";

// Requests
import Axios from "axios";

// Define what the auth context contains
interface AuthContextType {
    user: Profile | null;
    isLoggedIn: boolean;
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
    const signIn = (code: string) => {
        return new Promise((resolve, reject) => {
            // TODO: use .env for url
            const url = `/api/auth/confirm?token=${code}`;

            interface AuthResponse {
                shouldCreateUser: boolean;
                user: null | object;
                authToken: string;
                intraId: string;
            }

            Axios.get(url).then(({ data }: { data: AuthResponse }) => {
                const authData = data;
                const shouldCreateAccount: boolean = authData.shouldCreateUser;

                // If the user doesn't have to create an account we can inmediatly set the data
                if (shouldCreateAccount) {
                    resolve(authData);
                }

                // TODO: set user profile to res data
                const newUserData: Profile = generateProfile(1)[0];
                newUserData.intraID = "rnijhuis";
                newUserData.username = "LowerRes";
                newUserData.img_url =
                    "https://images.ctfassets.net/vf2eiv36rew2/6vLLgPp8PvG9hfReO0dCIS/1b576d6080c255d6a5e6e884a11741ea/a.jpg?w=4000&h=2666&q=50&fm=webp";
                newUserData.banner_url =
                    "https://images.unsplash.com/photo-1621687578668-aa1b449c7b29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80";
                setUser(newUserData);
                setLoggedIn(true);
                resolve(authData);
            });
        });
    };

    const value = { user, signIn, isLoggedIn, authToken, setAuthToken };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
