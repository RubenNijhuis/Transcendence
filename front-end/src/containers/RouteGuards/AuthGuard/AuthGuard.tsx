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

    const { isLoggedIn, setLoggedIn } = useAuth();
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const inLoginProcess = getItem<boolean>(StoreId.loginProcess);
        const refreshToken = getItem<string>(StoreId.refreshToken);

        const checkSetThrough = async () => {
            if (!user) {
                if (!isLoggedIn && refreshToken) {
                    try {
                        const { profile } = await checkTokenValidity(
                            refreshToken
                        );
                        console.log("I HAPPENED");
                        setLoggedIn(true);
                        setUser(profile);
                        return;
                    } catch (err) {
                        console.error(err);
                    }
                }

                if (!isLoggedIn) {
                    console.log("I CAME");
                    navigate(rerouteLink);
                    return;
                }
            }
        };
        checkSetThrough();
    }, [isLoggedIn, user]);

    ///////////////////////////////////////////////////////////

    return <Outlet />;
};

///////////////////////////////////////////////////////////

export default AuthGuard;
