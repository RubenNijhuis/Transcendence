// React
import { useEffect, useState } from "react";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import DirectMessageList from "../containers/DirectMessageList";
import ChatBox from "../containers/ChatBox";

// Types
import { GroupChat } from "../utils/GlobalTypes";

// Requests
import getChats from "../proxies/chat/getChats";

// Auth
import { useAuth } from "../utils/AuthContext";

const Chat = () => {
    const [groupChats, setGroupChats] = useState<GroupChat[]>(null!);
    const [selectedChat, setSelectedChat] = useState<number>(0);

    const { user, authToken } = useAuth();

    useEffect(() => {
        if (user !== null) {
            getChats(user.username, authToken)
                .then((returnedChats) => {
                    setGroupChats(returnedChats as GroupChat[]);
                })
                .catch((err) => console.log(err));
        }
    }, [authToken, user]);

    return (
        <Layout>
            {groupChats !== null ? (
                <ChatInterface>
                    <DirectMessageList
                        directMessages={groupChats}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />
                    <ChatBox chat={groupChats[selectedChat]} />
                </ChatInterface>
            ) : (
                <Loader />
            )}
        </Layout>
    );
};

export default Chat;
