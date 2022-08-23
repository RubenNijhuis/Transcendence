// Routing
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Button from "../components/Button";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";

// Debug
import Logger from "../utils/Logger";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    // Temp debug
    Logger("AUTH", "User data", auth.user);

    const handleLogin = () => {
        auth.signin({}, () => {
            navigate("/profile/me", { replace: true });
        });
    };

    const handleLogout = () => {
        auth.signout(() => {
            navigate("/", { replace: true });
        });
    };

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Login page</Heading>
                <Button onClick={handleLogin}>Login with the button</Button>
                <Button onClick={handleLogout}>Logout with the button</Button>
            </Fragment>
        </Layout>
    );
};

export default Login;
