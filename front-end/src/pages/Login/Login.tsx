// UI
import Layout from "../../components/Layout";
import Heading from "../../components/Heading";
import LoginOptions from "../../containers/LoginOptions";

////////////////////////////////////////////////////////////

const Login = (): JSX.Element => {
    return (
        <Layout>
            <Heading type={1}>Login page</Heading>
            <LoginOptions/>
        </Layout>
    );
};

////////////////////////////////////////////////////////////

export default Login;
