import { Fragment } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import ChatInterface from "../containers/ChatInterface";

const Chat = () => {
    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Chat</Heading>
                <ChatInterface>
                    <span>test</span>
                    {/* <DirectMessage />
                    <ChatBox/> */}
                </ChatInterface>
            </Fragment>
        </Layout>
    );
};

export default Chat;
