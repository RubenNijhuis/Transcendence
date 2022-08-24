import { Fragment, useEffect, useState } from "react";

// Components
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import DirectMessageList from "../containers/DirectMessageList";
import ChatBox from "../containers/ChatBox";

// Data
import { generateGroupChats } from "../utils/randomDataGenerator";
import { GroupChat } from "../utils/GlobalTypes";
import { useAuth } from "../utils/AuthContext";

const Chat = () => {
    const { user } = useAuth();
    const [chats, setMessages] = useState<GroupChat[] | null>(null);
    const [selectedChat, setSelectedChat] = useState<number>(0);

    const getMessages = () => {
        const reqPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const mixChats: GroupChat[] = [
                    ...generateGroupChats(user, 2, 1)
                    // ...generateGroupChats(user, 1, 2),
                    // ...generateGroupChats(user, 1, 1),
                ];
                resolve(mixChats);
            }, 1000);
        });
        return reqPromise;
    };

    useEffect(() => {
        getMessages().then((res) => setMessages(res as GroupChat[]));
    }, []);

    return (
        <Layout>
            <Fragment>
                <Heading type={1}>Chat</Heading>
                {chats !== null ? (
                    <ChatInterface>
                        <DirectMessageList
                            directMessages={chats}
                            selectedChat={selectedChat}
                            setSelectedChat={setSelectedChat}
                        />
                        <ChatBox chat={chats[selectedChat]} />
                    </ChatInterface>
                ) : (
                    <Loader />
                )}
            </Fragment>
        </Layout>
    );
};

export default Chat;
