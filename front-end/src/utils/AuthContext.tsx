// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useState } from "react";

// Define what the auth context contains
interface AuthContextType {
    user: any;
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
        const opt = {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: "ztan",
                password: "123456789",
                email: "zenotan@outlook.nl"
            })
        };
        const res = await fetch("http://localhost:3000/users/create", opt);
        const json = await res.json();
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(() => callback(json), 1000); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 1000);
    }
};

// Shorthand to use auth as a hook
const useAuth = () => {
    return useContext(AuthContext);
};

/**
 * The authprovider creates a "bucket" in which we can store all
 * the user data as well as the utility functions like login and logout
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const signin = (loginData: any, callback: VoidFunction) => {
        return fakeAuthProvider.signin(loginData, (newUserData: any) => {
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
