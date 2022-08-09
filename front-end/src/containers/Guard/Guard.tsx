// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";

// Temporary useAuth hook
const useAuth = () => {
    if (false) {
        return { user: true };
    } else {
        return { user: undefined };
    }
};

/**
 * The guard component is called when a route is requested that 
 * requires certain actions or data before the user may enter.
 * 
 * This guard may do two things. Choice A is rendering the requestes 
 * source if the conditions is met and B rerouting to the login page 
 * to request the correct credentials.
 * @returns a reroute
 */
const Guard = () => {
    const { user } = useAuth();
    const location = useLocation();

    return user !== undefined ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default Guard;
