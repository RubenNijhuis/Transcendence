// Router
import { Outlet, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Store
import StoreId from "../../../config/StoreId";
import { getItem } from "../../../modules/Store";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";

///////////////////////////////////////////////////////////

/**
 * Checks if certain conditions are met when an AuthGuarded
 * page is accessed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const rerouteLink = PageRoutes.whenNotLoggedIn;

    ////////////////////////////////////////////////////////////

    const { isLoggedIn } = useAuth();
    const { user } = useUser();
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////

    // useEffect(() => {
    //     const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

    //     // if (inLoginProcess === null) {
    //     //     navigate(rerouteLink);
    //     //     return;
    //     // }

    //     // if (!isLoggedIn) {
    //     //     navigate(rerouteLink);
    //     //     return;
    //     // }
    // }, [isLoggedIn]);

    ///////////////////////////////////////////////////////////

    return <Outlet />;
};

///////////////////////////////////////////////////////////

export default AuthGuard;
