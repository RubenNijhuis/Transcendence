import styled from "styled-components";

// UI
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import ChatSelector from "../containers/Chat/Selector";
import ChatBox from "../containers/Chat/Box";

// Context
import { useChat } from "../contexts/ChatContext";
import { magicNum } from "../styles/StylingConstants";

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${magicNum};
`;

const ChatPage = () => {
    const { allChats, activeChatID, setActiveChatID } = useChat();

    return (
        <Layout>
            <Container>
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
            </Container>
        </Layout>
    );
};

export default ChatPage;
