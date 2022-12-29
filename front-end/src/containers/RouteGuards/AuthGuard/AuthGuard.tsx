// React
import { useEffect } from "react";

// Router
import { Outlet, useNavigate } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

// Store
import StoreId from "../../../config/StoreId";
import * as Store from "../../../modules/Store";

// Auth check
import { useAuth } from "../../../contexts/AuthContext";
import { useUser } from "../../../contexts/UserContext";
import { redirectToLogin } from "../../../contexts/AuthContext/AuthContext.bl";

// Proxies
import { checkTokenValidity } from "../../../proxies/auth";

///////////////////////////////////////////////////////////

/**
 * Checks if certain conditions are met when an AuthGuarded
 * page is accessed. Otherwise reroute to another page
 */
const AuthGuard = () => {
    const { isLoggedIn, setLoggedIn } = useAuth();
    const { setUser } = useUser();
    const navigate = useNavigate();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        const checkLetThrough = async () => {
            const refreshToken = Store.getItem<string>(StoreId.refreshToken);
            const inLoginProcess = Store.getItem<boolean>(StoreId.loginProcess);

            if (inLoginProcess) {
                navigate(PageRoutes.profile);
                return;
            }

            if (refreshToken === null) {
                navigate(PageRoutes.whenNotLoggedIn);
                return;
            }

            if (!isLoggedIn) {
                try {
                    const { profile } = await checkTokenValidity(refreshToken);
                    setLoggedIn(true);
                    setUser(profile);
                    return;
                } catch (err) {
                    redirectToLogin();
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
