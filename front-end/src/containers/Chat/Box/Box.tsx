// Types
import { Chat } from "../../../types";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";
import Asset from "../../../components/Asset";

// Styling
import { Container } from "./Box.style";

// Types
import { Profile } from "../../../types";

// User
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface IChatTitle {
    chat: Chat.Group.Instance;
    isDmChat: boolean;
}

const ChatTitle = ({ chat, isDmChat }: IChatTitle): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    /**
     * If the the amount of members is 2 it means it a DM
     * Therefore we can change the interface from 'Chat' to 'other user name'
     */
    const otherMember: Profile.Instance = chat.members
        .filter((member: Profile.Instance) => member.uid !== user.uid)
        .shift() as Profile.Instance;

    const chatTitle: string = (
        isDmChat ? otherMember.username : chat.name
    ) as string;

    ////////////////////////////////////////////////////////////

    return (
        <div className="title">
            {isDmChat && (
                <Asset
                    alt={`${otherMember.username} profile`}
                    url={otherMember.img_url}
                />
            )}
            <Heading type={3}>{chatTitle}</Heading>
        </div>
    );
};

interface IChatBox {
    chat: Chat.Group.Instance;
}

const ChatBox = ({ chat }: IChatBox): JSX.Element => {
    const isDmChat = chat.members.length === 2;

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatTitle chat={chat} isDmChat={isDmChat} />

            <div className="chat-content">
                {chat.messages.map((message, count) => (
                    <ChatElement
                        key={count}
                        message={message}
                        isDm={isDmChat}
                        fromUser={message.sender.uid === user.uid}
                    />
                ))}
            </div>
            <ChatInput user={user} groupchat={chat} />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatBox;
