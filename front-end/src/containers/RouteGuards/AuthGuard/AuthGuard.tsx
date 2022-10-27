// React
import { useEffect } from "react";

// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Store
import StoreId from "../../../config/StoreId";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { getItem } from "../../../modules/Store";

/**
 * Checks if certain conditions are met when a AuthGuarded
 * page is accesed. Otherwise reroute to another page
 */
const AuthGuard = (): JSX.Element => {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    let renderOutlet: boolean = true;

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (isLoggedIn) {
            renderOutlet = true;
            return;
        }

        /**
         * In the login process we must show the profile page
         */
        const isInLoginProcess = getItem<boolean>(StoreId.loginProcess);
        if (isInLoginProcess) {
            renderOutlet = true;
            return;
        }
    }, [isLoggedIn]);

    ////////////////////////////////////////////////////////////

    return (
        <>
            {renderOutlet ? (
                <Outlet />
            ) : (
                <Navigate
                    to={PageRoutes.whenNotLoggedIn}
                    state={{ from: location }}
                    replace
                />
            )}
        </>
    );
};

export default AuthGuard;
