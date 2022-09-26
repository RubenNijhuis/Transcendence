// UI
import Layout from "../components/Layout";
import Heading from "../components/Heading";
import validateCredentials from "../proxies/auth/validateCredentials";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { authToken } = useAuth();

    const checkCreds = () => {
        validateCredentials(authToken)
    };

    return (
        <Layout>
            <Heading type={1}>Home page</Heading>
            <button
                onClick={checkCreds}
            >
                Run fake func
            </button>
        </Layout>
    );
};

export default Home;
