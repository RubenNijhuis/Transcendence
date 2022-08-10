// A lot of this was taken from https://stackblitz.com/github/remix-run/react-router/tree/main/examples/auth?file=src%2FApp.tsx
import { createContext, useContext, useEffect, useState } from "react";

// Define what the auth context contains
interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>(null!);

// (temporary) Fake authentication module to emulate logging in
const fakeAuthProvider = {
    isAuthenticated: false,
    signin(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = true;
        setTimeout(callback, 1000); // fake async
    },
    signout(callback: VoidFunction) {
        fakeAuthProvider.isAuthenticated = false;
        setTimeout(callback, 1000);
    },
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
    let [user, setUser] = useState<any>(null);

    let signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser({
                name: "Ruben",
                intra_name: "rnijhuis",
                ranking: 1,
            });
            callback();
        });
    };

    useEffect(() => {
        setUser({
            name: "Ruben",
            intra_name: "rnijhuis",
            ranking: 1,
        });
    }, []);

    let signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        });
    };

    const value = { user, signin, signout };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
