// Routing
import { useNavigate } from "react-router-dom";

import Axios from "axios";

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
        console.log("Login");
        Axios.get("/api/auth/login").then((res) =>
            window.location.assign(res.data)
        );
    };

    return (
        <Layout>
            <Heading type={1}>Login page</Heading>
            <Button onClick={handleLogin}>Login with the button</Button>
        </Layout>
    );
};

export default Login;
