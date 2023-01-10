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
import { useUser } from "../../contexts/UserContext";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChatId, setActiveChatId, groupChats } = useChat();

    ////////////////////////////////////////////////////////

    const { createConnection } = useSocket();

    const { user } = useUser();
    ////////////////////////////////////////////////////////

    useEffect(() => {
        // Setup the socket connnection to retrieve real-time messages
        createConnection(SocketType.Type.Chat);
    }, [user]);

    ////////////////////////////////////////////////////////

    return (
        <Layout>
            <Container>
                <ChatSelector
                    groupChats={groupChats}
                    setSelectedChat={setActiveChatId}
                />

                {activeChatId && <ChatBox />}
            </Container>
        </Layout>
    );
};

export default ChatPage;
