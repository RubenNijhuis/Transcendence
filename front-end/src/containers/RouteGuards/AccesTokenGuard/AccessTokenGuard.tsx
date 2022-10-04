// Router
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";

/**
 * Checks if certain conditions are met when a AuthGarded
 * page is accesed. Otherwise reroute to another page
 */
const AccessTokenGuard = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    /**
     * If the user is logged in reroute to profile
     * If the user isn't logged in but has a jwt go here
     */
    useEffect(() => {
        if (isLoggedIn === true) navigate(PageRoutes.profile);
    });

    return <Outlet />;
};

export default AccessTokenGuard;
