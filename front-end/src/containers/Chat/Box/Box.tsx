// Types
import { GroupChat } from "../../../types/chat";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";

// Styling
import { Container } from "./Box.style";

// Auth
import { useAuth } from "../../../contexts/AuthContext";

interface Props {
    chat: GroupChat;
}

const ChatBox = ({ chat }: Props) => {
    const { user } = useAuth();

    return (
        <Container>
            <div className="title">
                <Heading type={3}>Chat</Heading>
            </div>
            <div className="chat-content">
                {chat.messages.map((message, count) => {
                    return (
                        <ChatElement
                            key={count}
                            message={message}
                            fromUser={
                                message.sender?.username === user.username
                            }
                        />
                    );
                })}
            </div>
            <ChatInput user={user!} groupchat={chat} />
        </Container>
    );
};

export default ChatBox;
