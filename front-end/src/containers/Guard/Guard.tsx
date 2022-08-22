// Router
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

/**
 * The guard component is called when a route is requested that
 * requires certain actions or data before the user may enter.
 *
 * This guard may do two things. Choice A is rendering the requestes
 * source if the conditions is met and B rerouting to the login page
 * to request the correct credentials.
 * @returns a reroute
 */
const Guard = () => {
    const auth = useAuth();
    const location = useLocation();

    /*
        If the user is logged in we render the outlet 
        which is pretty much the component we wanted 
        to render anyway.

        Otherwise we reroute them to the login page
    */
    if (auth.isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

export default Guard;
