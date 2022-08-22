// Components
import Layout from "../components/Layout";
import PongGame from "../containers/PongGame";

// Debug
import Logger from "../utils/Logger";

const Play = () => {
    return (
        <Layout>
            <div>
                <PongGame/>
            </div>
        </Layout>
    );
};

export default Play;
