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
import { checkTokenValidity } from "../../../proxies/auth";

///////////////////////////////////////////////////////////

/**
 * Checks if certain conditions are met when an AuthGuarded
 * page is accessed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const rerouteLink = PageRoutes.whenNotLoggedIn;

    ////////////////////////////////////////////////////////////

    const { isLoggedIn, setLoggedIn } = useAuth();
    const { setUser } = useUser();
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const checkLetThrough = async () => {
            const refreshToken = getItem<string>(StoreId.refreshToken);
            const inLoginProcess = getItem<boolean>(StoreId.loginProcess);

            if (inLoginProcess) {
                navigate(PageRoutes.profile);
                return;
            }

            if (!isLoggedIn) {
                if (refreshToken) {
                    const { profile } = await checkTokenValidity(refreshToken);
                    setLoggedIn(true);
                    setUser(profile);
                } else {
                    navigate(rerouteLink);
                }
            }
        };
        checkLetThrough();
    }, [isLoggedIn]);

    ///////////////////////////////////////////////////////////

    return <Outlet />;
};

///////////////////////////////////////////////////////////

export default AuthGuard;
