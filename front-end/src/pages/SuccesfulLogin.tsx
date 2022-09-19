// React
import { useEffect } from "react";

// UI
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Auth
import { useAuth } from "../contexts/AuthContext";

// Routing
import { useNavigate } from "react-router-dom";

// Types
import { LoginConfirmResponse } from "../types/request";

// Page routes
import PageRoutes from "../config/PageRoutes";

const SuccesfulLogin = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    /**
     * Send the token to the back-end to get the user data.
     *
     * Response will decide if the user needs to be routed
     * to the create-profile page or just the profile page
     */
    const userRequestProcess = () => {
        const href = window.location.href;
        const token = href.split("?code=")[1];

        signIn(token).then((res: LoginConfirmResponse) => {
            if (res.shouldCreateUser === true) {
                navigate(PageRoutes.createAccount);
            } else {
                navigate(PageRoutes.profile);
            }
        });
    };

    // Inmediatly set up the request
    useEffect(() => userRequestProcess());

    return (
        <Layout>
            <Heading type={1}>
                Succesfully logged in through the intra API!
            </Heading>
            <p>You will be redirected to your account shortly</p>
            <img
                src="https://media4.giphy.com/media/s2qXK8wAvkHTO/giphy.webp?cid=ecf05e47z3xi18eq8hka0sms71o4o3xkhbhb7i85eo2zkdob&rid=giphy.webp&ct=g"
                alt="celabration"
            />
        </Layout>
    );
};

export default SuccesfulLogin;
