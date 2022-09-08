// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";

// Auth check
import { useAuth } from "../../utils/AuthContext";

const Guard = () => {
    const auth = useAuth();
    const location = useLocation();

    // If the user isn't logged in we reroute them to the login page
    if (!auth.isLoggedIn)
        return <Navigate to="/login" state={{ from: location }} replace />;

    return <Outlet />;
};

export default Guard;
