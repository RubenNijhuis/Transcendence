// Components
import Layout from "../components/Layout";
import Heading from "../components/Heading";

import CreateUserTempForm from "../containers/CreateUserTempForm/CreateUserTempForm";

const Home = () => {
    return (
        <Layout>
            <div>
                <Heading type={1}>Poopoo page</Heading>
                <CreateUserTempForm />
            </div>
        </Layout>
    );
};

export default Home;
