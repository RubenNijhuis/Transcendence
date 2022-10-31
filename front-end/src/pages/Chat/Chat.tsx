// UI
import Layout from "../../components/Layout";
import ChatSelector from "../../containers/Chat/Selector";
import ChatBox from "../../containers/Chat/Box";

// Style
import { Container } from "./Chat.style";

// Context
import { useChat } from "../../contexts/ChatContext";
import { useSocket } from "../../contexts/SocketContext";
import { useEffect } from "react";
import { Socket } from "../../types";
import SocketRoutes from "../../config/SocketRoutes";

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, directChats, groupChats } = useChat();

    ////////////////////////////////////////////////////////////

    const { connection, setSocketType } = useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setSocketType(Socket.SocketType.Chat);

        // Connection check
        connection.emit(SocketRoutes.connectionCheck(), null);

        connection.on(
            SocketRoutes.connectionCheck(),
            (connectionStatus: boolean) => {
                console.log("Connection check", connectionStatus);
            }
        );
    });

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
