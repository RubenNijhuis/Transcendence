// Navigation after login
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";

// Components
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";
import Logger from "../utils/Logger";

const Login = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    Logger("AUTH", "user data", auth.user);

    // Page to go to after login
    const from = "/profile";

    const handleLogin = () => {
        auth.signin(
            { email: "contact@rubennijhuis.com", password: "peepee" },
            () => {
                navigate(from, { replace: true });
            }
        );
    };

    const handleLogout = () => {
        auth.signout(() => {
            navigate("/", { replace: true });
        });
    };

    return (
        <Layout>
            <div>
                <Heading type={1}>Login page</Heading>
                <Button onClick={handleLogin}>Login with the button</Button>
                <Button onClick={handleLogout}>Logout with the button</Button>
            </div>
        </Layout>
    );
};

export default Login;
