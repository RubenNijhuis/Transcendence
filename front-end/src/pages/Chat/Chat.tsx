// UI
import Layout from "../../components/Layout";
import ChatSelector from "../../containers/Chat/Selector";
import ChatBox from "../../containers/Chat/Box";

// Style
import { Container } from "./Chat.style";

// Context
import { useChat } from "../../contexts/ChatContext";
import Heading from "../../components/Heading";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, directChats, groupChats } = useChat();

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            {/* If no chats have been created yet. We display a message */}
            {!activeChat && (
                <>
                    <Heading type={2}>No chats retrieved from database</Heading>
                    <p>Go touch grass</p>
                </>
            )}
            <Container>
                {activeChat && (
                    <ChatSelector
                        directChats={directChats}
                        groupChats={groupChats}
                        selectedChat={activeChat}
                        setSelectedChat={setActiveChat}
                    />
                )}

                {activeChat && <ChatBox chat={activeChat} />}
            </Container>
        </Layout>
    );
};

export default ChatPage;
