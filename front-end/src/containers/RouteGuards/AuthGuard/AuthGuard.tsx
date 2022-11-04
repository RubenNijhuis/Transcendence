// Router
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Store
import StoreId from "../../../config/StoreId";
import { getItem } from "../../../modules/Store";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import { checkTokenValidity } from "../../../proxies/auth";

///////////////////////////////////////////////////////////

/**
 * Checks if certain conditions are met when an AuthGuarded
 * page is accessed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const rerouteLink = PageRoutes.whenNotLoggedIn;

    ////////////////////////////////////////////////////////////

    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const checkLetThrough = async () => {
            const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

            if (inLoginProcess === null) {
                navigate(rerouteLink);
                return;
            }

            if (!isLoggedIn) {
                navigate(rerouteLink);
                return;
            }
        };
        checkLetThrough();
    });

    ///////////////////////////////////////////////////////////

    return <Outlet />;
};

///////////////////////////////////////////////////////////

export default AuthGuard;
