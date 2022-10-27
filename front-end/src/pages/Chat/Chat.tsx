import styled from "styled-components";

// UI
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import ChatSelector from "../../containers/Chat/Selector";
import ChatBox from "../../containers/Chat/Box";

// Context
import { useChat } from "../../contexts/ChatContext";
import { magicNum } from "../../styles/StylingConstants";
import { useEffect } from "react";

// TODO: have this in a style file
const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: calc(${magicNum} / 2);
`;

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
