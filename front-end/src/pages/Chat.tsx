
import { Fragment } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";

const Chat = () => {
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
