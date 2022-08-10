import Heading from "../components/Heading";
import Layout from "../components/Layout";
import PongGame from "../containers/PongGame";

const Play = () => {
    return (
        <Layout>
            <div>
                <Heading type={1}>Play a game!</Heading>
                <PongGame/>
            </div>
        </Layout>
    );
};

export default Play;
