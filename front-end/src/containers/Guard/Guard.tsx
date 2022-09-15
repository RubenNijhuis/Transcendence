// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";

// Auth check
import { useAuth } from "../../utils/AuthContext";

const Guard = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();

    console.log("Guard called");

    // If the user isn't logged in we reroute them to the home page
    if (!isLoggedIn)
        return <Navigate to="/" state={{ from: location }} replace />;

    return <Outlet />;
};

export default Guard;
