// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";
import { Profile } from "./GlobalTypes";
import { generateProfile } from "./randomDataGenerator";

// Define what the auth context contains
interface AuthContextType {
    user: Profile | null;
    isLoggedIn: boolean;
    signin: (user: any, callback: VoidFunction) => any;
    signout: (callback: VoidFunction) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>(null!);

// (temporary) Fake authentication module to emulate logging in
// Will run some code and eventually set a callback
// Will set user variable
const fakeAuthProvider = {
    isAuthenticated: false,
    async signin(loginData: any, callback: any) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(() => callback(generateProfile(1)[0]), 1000); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 1000);
    }
};

// Shorthand to use auth as a hook
const useAuth = () => useContext(AuthContext);

/**
 * The authprovider creates a "bucket" in which we can store all
 * the user data as well as the utility functions like login and logout
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const signin = (loginData: any, callback: VoidFunction) => {
        return fakeAuthProvider.signin(loginData, (newUserData: Profile) => {
            // Permanent data
            newUserData.intraID = 424242;
            newUserData.username = "LowerRes";
            newUserData.img_url =
                "https://images.ctfassets.net/vf2eiv36rew2/6vLLgPp8PvG9hfReO0dCIS/1b576d6080c255d6a5e6e884a11741ea/a.jpg?w=4000&h=2666&q=50&fm=webp";
            newUserData.banner_url =
                "https://images.unsplash.com/photo-1621687578668-aa1b449c7b29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2970&q=80";
            newUserData.friends = generateProfile(2);

            setUser(newUserData);
            setLoggedIn(true);
            callback();
        });
    };

    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            setLoggedIn(false);
            callback();
        });
    };

    const value = { user, signin, signout, isLoggedIn };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
