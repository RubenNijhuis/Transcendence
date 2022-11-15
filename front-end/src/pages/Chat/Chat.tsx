// UI
import Layout from "../../components/Layout";
import ChatSelector from "../../containers/Chat/Selector";
import ChatBox from "../../containers/Chat/Box";

// Style
import { Container } from "./Chat.style";

// Context
import { useChat } from "../../contexts/ChatContext";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, directChats, groupChats } = useChat();

    ////////////////////////////////////////////////////////////

    return (
        <Layout>
            <Container>
                <ChatSelector
                    directChats={directChats}
                    groupChats={groupChats}
                    selectedChat={activeChat}
                    setSelectedChat={setActiveChat}
                />

                {activeChat && <ChatBox chat={activeChat} />}
            </Container>
        </Layout>
    );
};

export default ChatPage;
