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

///////////////////////////////////////////////////////////

const ChatPage = (): JSX.Element => {
    const { activeChat, setActiveChat, directChats, groupChats } = useChat();

    ////////////////////////////////////////////////////////////

    const { connection, socketType, setSocketType } = useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        setSocketType(Socket.SocketType.Chat);

        connection.emit("connectionCheck", "pee pee poo poo");

        connection.on("connectionCheck", (res: string) => {
            console.log("RESPONSE", res);
        });
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
