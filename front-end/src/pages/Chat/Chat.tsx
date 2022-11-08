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

// Types
import { SocketType } from "../../types";

// Config
import SocketRoutes from "../../config/SocketRoutes";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, directChats, groupChats } = useChat();

    ////////////////////////////////////////////////////////////

    const { connection, createConnection } = useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        createConnection(SocketType.SocketType.Chat);
    }, []);

    useEffect(() => {
        if (!connection) return;

        connection.on(
            SocketRoutes.connectionCheck(),
            (connectionStatus: boolean) => {
                console.log("Connection check", connectionStatus);
            }
        );

        return () => {
            connection.off(SocketRoutes.connectionCheck());
        };
    }, [connection]);

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
