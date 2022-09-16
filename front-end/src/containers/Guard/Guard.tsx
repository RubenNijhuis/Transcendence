// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { PageRoutes } from "../../config";

// Auth check
import { useAuth } from "../../utils/AuthContext";

/**
 * Checks if certain conditions are met when a guarded
 * page is accesed. Otherwise reroute to another page
 */
const Guard = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    if (isLoggedIn === false)
        return (
            <Navigate
                to={PageRoutes.whenNotLoggedIn}
                state={{ from: location }}
                replace
            />
        );

    return <Outlet />;
};

export default Guard;
