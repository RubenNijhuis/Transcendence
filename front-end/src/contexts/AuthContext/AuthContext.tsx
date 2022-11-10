// React stuff
import { createContext, useContext, useEffect, useState } from "react";

// Store
import { getItem, setItem } from "../../modules/Store";
import StoreId from "../../config/StoreId";

// Types
import { Request } from "../../types";

// User
import { useUser } from "../UserContext";

// Business logic
import { redirectToHome, signIn, signOut } from "./AuthContext.bl";

// Proxies
import { checkTokenValidity } from "../../proxies/auth";

///////////////////////////////////////////////////////////

interface AuthContextType {
    isLoggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

    tfaEnabled: boolean;
    setTfaEnabled: React.Dispatch<React.SetStateAction<boolean>>;

    signIn(code: string): Promise<Request.Response.ConfirmLogin>;
    signOut(): void;
}

// Create the context
const AuthContext = createContext<AuthContextType>(null!);

// Shorthand to use auth as a hook
const useAuth = () => useContext(AuthContext);

///////////////////////////////////////////////////////////

interface IAuthProvider {
    children: React.ReactNode;
}

/**
 * The authprovider creates a "bucket" in which we can store all
 * the user data as well as the utility functions like login and logout
 */
const AuthProvider = ({ children }: IAuthProvider): JSX.Element => {
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [tfaEnabled, setTfaEnabled] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const { user, setUser } = useUser();

    ////////////////////////////////////////////////////////////

    /**
     * The authentication state will update
     * when a user object exists. Here we
     * set the site settings to logged in.
     *
     * And check for 2fa
     */
    useEffect(() => {
        if (!user) return;

        setLoggedIn(true);
        setItem(StoreId.loginProcess, false);

        if (user?.isTfaEnabled) {
            setTfaEnabled(user.isTfaEnabled);
        }
    }, [user]);

    /**
     * Here we check the auth token status.
     */
    useEffect(() => {
        const checkAuthTokenStatus = async () => {
            /**
             * If we are still in the login process we don't
             * have to check token status/validity
             */
            const isInLoginProcess = getItem<boolean>(StoreId.loginProcess);
            if (isInLoginProcess) return;
            /**
             * If the refresh token doesn't exist we redirect
             * the user to a page where they cal log in
             */
            const refreshToken = getItem<string>(StoreId.refreshToken);
            if (refreshToken === null) {
                redirectToHome();
                return;
            }
            try {
                const { profile } = await checkTokenValidity(refreshToken);
                console.log("Or here");
                setLoggedIn(true);
                setUser(profile);
            } catch (err) {
                redirectToHome();
            }
        };
        checkAuthTokenStatus();
    }, []);

    ////////////////////////////////////////////////////////////

    const value: AuthContextType = {
        signIn,
        signOut,

        tfaEnabled,
        setTfaEnabled,

        isLoggedIn,
        setLoggedIn
    };

    ////////////////////////////////////////////////////////////

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

///////////////////////////////////////////////////////////

export { useAuth };
export default AuthProvider;
