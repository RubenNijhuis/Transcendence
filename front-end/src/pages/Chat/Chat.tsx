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
    const { activeChatId } = useChat();

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            <Container>
                <ChatSelector />

                {activeChatId && <ChatBox />}
            </Container>
        </Layout>
    );
};

export default ChatPage;
