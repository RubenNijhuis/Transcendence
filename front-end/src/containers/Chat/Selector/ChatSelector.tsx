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
import { Container, DirectMessageEntry } from "./ChatSelector.style";
import Button from "../../../components/Button";
import { useModal } from "../../../contexts/ModalContext";
import ChatInterface from "../Interface";

interface Props {
    directMessages: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Display the members of a chat in the group list
 */
const MemberList = ({ members }: { members: ProfileType[] }) => {
    return (
        <div>
            {members.map(({ img_url, username }, count) => (
                <div
                    className="profile"
                    key={count}
                    style={{ marginBottom: 8 }}
                >
                    <Asset url={img_url} alt="profile" />
                    <span>{username}</span>
                </div>
            ))}
        </div>
    );
};

// Show a recent activity like a chat message
const RecentActivity = ({ message }: { message: Message }) => {
    return (
        <div className="activity">
            <div className="newMessage" />
        </div>
    );
};

///
const ChatTypeSelector = ({
    chatTypeSelector
}: {
    chatTypeSelector: React.Dispatch<React.SetStateAction<number>>;
}) => {
    return (
        <div className="title">
            <div className="chat-type" onClick={() => chatTypeSelector(0)}>
                <Heading type={3}>DM</Heading>
            </div>
            <div className="divider" />
            <div className="chat-type" onClick={() => chatTypeSelector(1)}>
                <Heading type={3}>Groups</Heading>
            </div>
        </div>
    );
};

const GroupMessageList = ({
    chats,
    selectedChat,
    setSelectedChat
}: {
    chats: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { user } = useAuth();

    const filteredChats = chats.filter((chat) => chat.members.length > 2);

    return (
        <>
            {filteredChats.map(({ members, messages }, count) => {
                const otherMembers: ProfileType[] = members.filter(
                    (member) => member.username !== user!.username
                );
                return (
                    <DirectMessageEntry
                        key={count}
                        onClick={() => setSelectedChat(count)}
                        active={count === selectedChat}
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

const DirectMessageList = ({
    chats,
    selectedChat,
    setSelectedChat
}: {
    chats: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const { user } = useAuth();

    const filteredChats = chats.filter((chat) => chat.members.length < 3);

    return (
        <>
            {filteredChats.map(({ members, messages }, count) => {
                const otherMembers: ProfileType[] = members.filter(
                    (member) => member.username !== user!.username
                );

                return (
                    <DirectMessageEntry
                        key={count}
                        onClick={() => setSelectedChat(count)}
                        active={count === selectedChat}
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
}: Props) => {
    const [selectedChatType, setSelectedChatType] = useState<number>(0);

    return (
        <Container>
            <ChatTypeSelector chatTypeSelector={setSelectedChatType} />
            <ChatInterface />

            <ul className="list">
                {selectedChatType === 0 ? (
                    <DirectMessageList
                        chats={directMessages}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />
                ) : (
                    <GroupMessageList
                        chats={directMessages}
                        selectedChat={selectedChat}
                        setSelectedChat={setSelectedChat}
                    />
                )}
            </ul>
        </Container>
    );
};

export default ChatSelector;
