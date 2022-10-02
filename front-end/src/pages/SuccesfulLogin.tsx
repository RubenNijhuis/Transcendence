// React
import { useEffect } from "react";

// UI
import Layout from "../components/Layout";
import SuccesfulLogin from "../containers/SuccesfulLogin/SuccesfulLogin";

// Auth
import { useAuth } from "../contexts/AuthContext";

// Routing
import { useNavigate } from "react-router-dom";

// Types
import { LoginConfirmResponse, RequestErrorType } from "../types/request";

// Page routes
import PageRoutes from "../config/PageRoutes";

// Utils
import { getValueFromUrl } from "../utils/getValueFromUrl";
import Logger from "../utils/Logger";

const SuccesfulLoginPage = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    /**
     * Send the token to the back-end to get the user data.
     *
     * Response will decide if the user needs to be routed
     * to the create-profile page or just the profile page
     */
    useEffect(() => {
        const href = window.location.href;
        // TODO: put "code" in a config file
        const token = getValueFromUrl(href, "code");

        signIn(token)
            .then((shouldCreateUser: boolean) => {
                if (shouldCreateUser === true) {
                    navigate(PageRoutes.createAccount);
                } else {
                    navigate(PageRoutes.profile);
                }
            })
            .catch((err: RequestErrorType) => {
                Logger("AUTH", "Succesful login", "Sign in issue", err);
            });
    });

    return (
        <Layout>
            <SuccesfulLogin />
        </Layout>
    );
};

export default SuccesfulLoginPage;
