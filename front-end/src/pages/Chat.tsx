import { Fragment } from "react";
import Heading from "../components/Heading";
import Layout from "../components/Layout";

// Authentication
import { useAuth } from "../utils/AuthContext";

// Debug
import Logger from "../utils/Logger";

const Chat = () => {
    const auth = useAuth();

    // Logger("AUTH", "User object", auth.user);

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Chat</Heading>
            </Fragment>
        </Layout>
    );
};

export default Chat;
