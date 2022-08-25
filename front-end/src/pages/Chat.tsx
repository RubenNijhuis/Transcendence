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

// Temporary function to get all chats
const getMessages = (user: Profile) => {
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

const Chat = () => {
    const [chats, setMessages] = useState<GroupChat[] | null>(null);
    const [selectedChat, setSelectedChat] = useState<number>(0);

    const { user } = useAuth();

    useEffect(() => {
        getMessages(user).then((res) => setMessages(res as GroupChat[]));
    }, [user]);

    return (
        <Layout>
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
        </Layout>
    );
};

export default Chat;
