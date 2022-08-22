// Components
import { Fragment } from "react";
import Layout from "../components/Layout";
import PongGame from "../containers/PongGame";

// Debug
import Logger from "../utils/Logger";

const Play = () => {
    return (
        <Layout>
            <Fragment>
                <PongGame/>
            </Fragment>
        </Layout>
    );
};

export default Play;
