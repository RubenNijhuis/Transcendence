// React
import { useEffect } from "react";

// Router
import { Navigate, useLocation, Outlet, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Store
import StoreId from "../../../config/StoreId";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { getItem } from "../../../modules/Store";
import { AuthTokenType } from "../../../types/request";

// DEBUG
import Logger from "../../../utils/Logger";

/**
 * Checks if certain conditions are met when a AuthGuarded
 * page is accesed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    let renderOutlet: boolean = true;

    useEffect(() => {
        if (isLoggedIn) {
            renderOutlet = true;
            Logger("AUTH", "AuthGuard", "User already logged in", true);
            return;
        }

        /**
         * In the login process we must show the profile page
         */
        const isInLoginProcess = getItem<boolean>(StoreId.loginProcess);
        if (isInLoginProcess) {
            renderOutlet = true;
            Logger("AUTH", "AuthGuard", "User is in login process", true);
            return;
        }

        /**
         * User must have an access token to reach these routes
         */
        const token = getItem<AuthTokenType>(StoreId.accessToken);
        if (token === undefined || token === null) {
            Logger("AUTH", "AuthGuard", "User doesn't have an authtoken", true);
            navigate(PageRoutes.home);
        } else {
            // checkTokenValidity
        }
    }, [isLoggedIn, navigate]);

    return renderOutlet ? (
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
