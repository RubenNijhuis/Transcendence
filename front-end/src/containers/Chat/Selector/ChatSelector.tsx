import { useState } from "react";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Auth
import { useAuth } from "../../../contexts/AuthContext";

// Types
import { ProfileType } from "../../../types/profile";
import { GroupChat, Message } from "../../../types/chat";

// Stylinh
import {
    ChatTypeSelectorContainer,
    Container,
    DirectMessageEntry
} from "./ChatSelector.style";
import ChatInterface from "../CreateGroup";
import { useUser } from "../../../contexts/UserContext";

interface Props {
    directMessages: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Display the members of a chat in the group list
 */
const MemberList = ({ members }: { members: ProfileType[] }): JSX.Element => {
    return (
        <div>
            {members.map(({ img_url, username }, count) => (
                <div
                    className="profile"
                    key={count}
                >
                    <Asset url={img_url} alt="profile" />
                    <span>{username}</span>
                </div>
            ))}
        </div>
    );
};

// Show a recent activity like a chat message
const RecentActivity = ({ message }: { message: Message }): JSX.Element => {
    return (
        <div className="activity">
            <div className="newMessage" />
        </div>
    );
};

const ChatTypeSelector = ({
    activeType,
    chatTypeSelector
}: {
    activeType: number;
    chatTypeSelector: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
    return (
        <ChatTypeSelectorContainer>
            <div
                className={`chat-type ${activeType === 0 ? "active" : null}`}
                onClick={() => chatTypeSelector(0)}
            >
                <Heading type={3}>DM</Heading>
            </div>
            <div className="divider" />
            <div
                className={`chat-type ${activeType === 1 ? "active" : null}`}
                onClick={() => chatTypeSelector(1)}
            >
                <Heading type={3}>Groups</Heading>
            </div>
        </ChatTypeSelectorContainer>
    );
};

const DirectMessageList = ({
    onlyGroups,
    chats,
    selectedChat,
    setSelectedChat
}: {
    onlyGroups: boolean;
    chats: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const filteredChats = chats.filter((chat) => {
        if (onlyGroups) {
            if (chat.members.length > 2) return true;
        } else {
            if (chat.members.length < 3) return true;
        }
    });

    ////////////////////////////////////////////////////////////

    return (
        <>
            {filteredChats.map(({ members, messages, internal_id }, count) => {
                const otherMembers: ProfileType[] = members.filter(
                    (member) => member.username !== user!.username
                );

                return (
                    <DirectMessageEntry
                        key={count}
                        onClick={() => setSelectedChat(internal_id)}
                        active={internal_id === selectedChat}
                    >
                        <div className="content">
                            <MemberList members={otherMembers} />
                            <RecentActivity
                                message={messages[messages.length - 1]}
                            />
                        </div>
                    </DirectMessageEntry>
                );
            })}
        </>
    );
};

const ChatSelector = ({
    directMessages,
    selectedChat,
    setSelectedChat
}: Props): JSX.Element => {
    const [selectedChatType, setSelectedChatType] = useState<number>(0);

    return (
        <Container>
            <ChatTypeSelector
                activeType={selectedChatType}
                chatTypeSelector={setSelectedChatType}
            />
            <ChatInterface />

            <ul className="list">
                <DirectMessageList
                    onlyGroups={selectedChatType === 1}
                    chats={directMessages}
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                />
            </ul>
        </Container>
    );
};

export default ChatSelector;
