import { Fragment } from "react";

// Types
import { GroupChat } from "../../utils/GlobalTypes";

// Components
import ChatElement from "../../components/ChatElements";
import ChatInput from "../ChatInput";

// Styling
import { Container } from "./ChatBox.style";
import { useAuth } from "../../utils/AuthContext";
import Heading from "../../components/Heading";

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
            {user && (
                <Fragment>
                    <div className="chat-content">
                        {chat.messages.map((message, count) => (
                            <ChatElement
                                key={count}
                                receiver={user}
                                sender={message.sender}
                                content={message}
                            />
                        ))}
                    </div>
                    <ChatInput user={user} groupchat={chat} />
                </Fragment>
            )}
        </Container>
    );
};

export default ChatBox;
