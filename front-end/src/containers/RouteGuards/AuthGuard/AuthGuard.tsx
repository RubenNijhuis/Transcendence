// Router
import { useEffect } from "react";
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";
import StoreId from "../../../config/StoreId";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { getItem } from "../../../modules/Store";
import { AuthTokenType } from "../../../types/request";

/**
 * Checks if certain conditions are met when a AuthGuarded
 * page is accesed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) return;

        const token = getItem<AuthTokenType>(StoreId.accessToken);
        if (token === undefined || token === null) {
            navigate(PageRoutes.home);
        } else {
            // checkTokenValidity
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? (
        <Outlet />
    ) : (
        <Navigate
            to={PageRoutes.whenNotLoggedIn}
            state={{ from: location }}
            replace
        />
    );
};

export default AuthGuard;
