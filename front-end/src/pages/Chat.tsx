import { useEffect, useState } from "react";

// Components
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import DirectMessageList from "../containers/DirectMessageList";
import ChatBox from "../containers/ChatBox";

// Data
import { GroupChat } from "../utils/GlobalTypes";
import { useDataDebug } from "../utils/DebugDataContext";

const Chat = () => {
    const [messages, setMessages] = useState<GroupChat[]>(null!);
    const [selectedChat, setSelectedChat] = useState<number>(0);

    const { chats } = useDataDebug();

    useEffect(() => {
        if (chats) setMessages(chats);
    }, [chats]);

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
