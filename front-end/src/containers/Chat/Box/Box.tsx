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
import { ProfileType } from "../../../types/profile";
import Asset from "../../../components/Asset";
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface Props {
    chat: GroupChat;
}

const ChatTitle = ({ chat }: Props): JSX.Element => {
    /**
     * If the the amount of members is 2 it means it a DM
     * Therefore we can change the interface from 'Chat' to 'other user name'
     */
    const { user } = useUser();
    const isDmChat: boolean = chat.members.length === 2;
    const otherMember: ProfileType = chat.members
        .filter((member) => member.uid !== user.uid)
        .shift() as ProfileType;

    return (
        <div className="title">
            {isDmChat && (
                <Asset
                    alt={`${otherMember.username} profile`}
                    url={otherMember.img_url}
                />
            )}
            <Heading type={3}>
                {isDmChat ? otherMember.username : chat.name}
            </Heading>
        </div>
    );
};

const ChatBox = ({ chat }: Props): JSX.Element => {
    const { user } = useUser();

    return (
        <Container>
            <ChatTitle chat={chat} />

            <div className="chat-content">
                {chat.messages.map((message, count) => (
                    <ChatElement
                        key={count}
                        message={message}
                        isDm={chat.members.length === 2}
                        fromUser={message.sender?.username === user.username}
                    />
                ))}
            </div>
            <ChatInput user={user!} groupchat={chat} />
        </Container>
    );
};

export default ChatBox;
