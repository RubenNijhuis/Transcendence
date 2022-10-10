// UI
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatInterface from "../containers/ChatInterface";
import ChatSelector from "../containers/ChatSelector";
import ChatBox from "../containers/ChatBox";

// Context
import { useChat } from "../contexts/ChatContext";

const ChatPage = () => {
    const { allChats, activeChatID, setActiveChatID } = useChat();

    return (
        <Layout>
            <ChatInterface>
                {allChats !== null ? (
                    <>
                        <ChatSelector
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
