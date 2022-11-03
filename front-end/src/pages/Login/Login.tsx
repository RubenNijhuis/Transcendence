// UI
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import LoginOptions from "../../containers/LoginOptions";
import { useEffect } from "react";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import PageRoutes from "../../config/PageRoutes";

////////////////////////////////////////////////////////////

const Login = (): JSX.Element => {
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(PageRoutes.profile);
        }
    });

    return (
        <Layout>
            <Heading type={1}>Login page</Heading>
            <LoginOptions />
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default Login;
