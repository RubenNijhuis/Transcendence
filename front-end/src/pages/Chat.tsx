
import { Fragment } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Debug
import Logger from "../utils/Logger";

const Chat = () => {
    // Logger("AUTH", "User object", auth.user);

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Chat</Heading>
                <div>
                    <div>
                        <Heading type={2}>Messages</Heading>
                    </div>
                    <div>
                        <Heading type={2}>Active chat</Heading>
                    </div>
                </div>
            </Fragment>
        </Layout>
    );
};

export default Chat;
