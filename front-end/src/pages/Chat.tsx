// React
import { useEffect } from "react";

// UI
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import DirectMessageList from "../containers/DirectMessageList";
import ChatBox from "../containers/ChatBox";

// Types
import { GroupChat } from "../types/chat";

// Requests
// import getChatByUserName from "../proxies/chat/getChatsByUserName";

// Auth
import { useAuth } from "../contexts/AuthContext";
// import Logger from "../utils/Logger";

// Temp data
import { useChat } from "../contexts/ChatContext";

const ChatPage = () => {
    const { allChats, activeChatID, setActiveChatID } = useChat();

    return (
        <Layout>
            <ChatInterface>
                {allChats !== null ? (
                    <>
                        <DirectMessageList
                            directMessages={allChats}
                            selectedChat={activeChatID}
                            setSelectedChat={setActiveChatID}
                        />
                        <ChatBox chat={allChats[activeChatID]} />
                    </>
                ) : (
                    <Loader />
                )}
            </ChatInterface>
        </Layout>
    );
};

export default ChatPage;
