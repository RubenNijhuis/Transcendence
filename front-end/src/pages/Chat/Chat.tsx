// React
import { useEffect } from "react";

// UI
import Layout from "../../components/Layout";
import ChatSelector from "../../containers/Chat/Selector";
import ChatBox from "../../containers/Chat/Box";

// Style
import { Container } from "./Chat.style";

// Context
import { useChat } from "../../contexts/ChatContext";
import { useSocket } from "../../contexts/SocketContext";

import * as SocketType from "../../types/Socket";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, groupChats } = useChat();

    ////////////////////////////////////////////////////////

    const { createConnection } = useSocket();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        // Setup the socket connnection to retrieve real-time messages
        createConnection(SocketType.Type.Chat);
    }, []);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            <Container>
                <ChatSelector
                    groupChats={groupChats}
                    setSelectedChat={setActiveChat}
                />

                {activeChat && <ChatBox chat={activeChat} />}
            </Container>
        </Layout>
    );
};

export default ChatPage;
