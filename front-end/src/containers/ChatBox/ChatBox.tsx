// Types
import { GroupChat } from "../../utils/GlobalTypes";

// Components
import ChatElement from "../../components/ChatElements";

// Debug
import Logger from "../../utils/Logger";

// Styling
import { Container } from "./ChatBox.style";
import { useAuth } from "../../utils/AuthContext";
import Heading from "../../components/Heading";

interface Props {
    chat: GroupChat;
}

const ChatBox = ({ chat }: Props) => {
    // Logger("DEBUG", "Chatbox", "Group chat", messages);
    const { user } = useAuth();
    return (
        <Container>
            <div className="title">
            <Heading type={3}>Chat</Heading>
            </div>
            <div className="chat-content">
                {chat.messages.map((message, count) => (
                    <ChatElement
                        key={count}
                        receiver={user}
                        content={message}
                    />
                ))}
            </div>
        </Container>
    );
};

export default ChatBox;
