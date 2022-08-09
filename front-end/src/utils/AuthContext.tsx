import { createContext } from "react";

// Create the context
const AuthContext = createContext({});

// Handy little hook
const useAuth = () => {
    return AuthContext;
};

export { useAuth };
export default AuthContext;
