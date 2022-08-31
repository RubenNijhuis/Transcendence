import { useEffect, useState } from "react";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import DirectMessageList from "../containers/DirectMessageList";
import ChatBox from "../containers/ChatBox";

// Data
import { generateGroupChats } from "../utils/randomDataGenerator";
import { GroupChat, Profile } from "../utils/GlobalTypes";
import { useAuth } from "../utils/AuthContext";
import { useDataDebug } from "../utils/DebugDataContext";
import Logger from "../utils/Logger";

// Temporary function to get all chats
// const getMessages = (user: Profile) => {
//     const reqPromise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(mixChats);
//         }, 1000);
//     });
//     return reqPromise;
// };

const Chat = () => {
    const [messages, setMessages] = useState<GroupChat[] | null>(null);
    const [selectedChat, setSelectedChat] = useState<number>(0);

    const { chats } = useDataDebug();

    useEffect(() => {
        setMessages(chats);
    }, []);

    return (
        <Layout>
            {messages !== null ? (
                <ChatInterface>
                    <DirectMessageList
                        directMessages={messages}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />
                    <ChatBox chat={messages[selectedChat]} />
                </ChatInterface>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default Chat;
