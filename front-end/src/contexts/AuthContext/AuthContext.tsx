// React stuff
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Store
import { clearAll, getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Types
import { SignInResponse } from "../../types/request";

// User
import { useUser } from "../UserContext";

// Business logic
import { redirectToHome, signIn, signOut } from "./AuthContext.bl";

// Proxies
import { checkTokenValidity } from "../../proxies/auth";

///////////////////////////////////////////////////////////

interface AuthContextType {
    isLoggedIn: boolean;

    signIn(code: string): Promise<SignInResponse>;
    signOut(): void;
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
    // const shouldRevalidateTokens = useRef(true);
    

    ////////////////////////////////////////////////////////////

    const { user, setUser } = useUser();

    ////////////////////////////////////////////////////////////

    // Auto-update logged in status if user exists
    useEffect(() => {
        if (!user) return;

        setLoggedIn(true);
        setItem(StoreId.loginProcess, false);
    }, [user]);

    /**
     * Checks if there is still an auth token in the store.
     * If there is still one we check it's validity and change
     * the auth state accordingly.
     * If the refresh token is also expired we ask the user
     * to manually log in by redirecting them to home
     */
    useEffect(() => {
        const runTokenRefresh = async () => {
            // If the user is still loggin in it's best to not work with the tokens yet
            const isInLoginProcess = getItem<boolean>(StoreId.loginProcess);
            if (isInLoginProcess) return;

            const refreshToken = getItem<string>(StoreId.refreshToken);
            if (refreshToken === null) {
                redirectToHome();
                return;
            }
            
            try {
                // if (shouldRevalidateTokens.current === false) return;

                const { user } = await checkTokenValidity(refreshToken);
                setUser(user);
                // shouldRevalidateTokens.current = false;
            } catch (err) {
                redirectToHome();
            }
        };
        runTokenRefresh();
    }, []);

    ////////////////////////////////////////////////////////////

    const value: AuthContextType = {
        signIn,
        signOut,

        isLoggedIn
    };

    ////////////////////////////////////////////////////////////

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export { useAuth };
export default AuthProvider;
