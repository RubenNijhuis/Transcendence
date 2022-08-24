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
    Logger("AUTH", "Login page", "Profile", auth.user);

    const handleLogin = () => {
        auth.signin({}, () => {
            navigate("/play", { replace: true });
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
                <Button onClick={handleLogin}>Fake Login</Button>
            </Fragment>
        </Layout>
    );
};

export default Login;
