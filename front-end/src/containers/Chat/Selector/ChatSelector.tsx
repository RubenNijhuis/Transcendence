// React
import { useEffect, useState } from "react";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Types
import { ProfileType } from "../../../types/profile";
import { GroupChat, GroupChatType, Message } from "../../../types/chat";

// Stylinh
import {
    ChatTypeSelectorContainer,
    Container,
    DirectMessageEntry
} from "./ChatSelector.style";
import ChatInterface from "../CreateGroup";
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface IMemberList {
    members: ProfileType[];
}

/**
 * Display the members of a chat in the group list
 */
const MemberList = ({ members }: IMemberList): JSX.Element => {
    return (
        <div>
            {members.map(({ img_url, username }, count) => (
                <div className="profile" key={count}>
                    <Asset url={img_url} alt="profile" />
                    <span>{username}</span>
                </div>
            ))}
        </div>
    );
};

interface IChatTypeSelector {
    activeType: GroupChatType;
    setActiveType: React.Dispatch<React.SetStateAction<GroupChatType>>;
}

const ChatTypeSelector = ({
    activeType,
    setActiveType
}: IChatTypeSelector): JSX.Element => {
    const handleChatTypeSelect = (type: GroupChatType): void => {
        setActiveType(type);
    };

    ////////////////////////////////////////////////////////////

    return (
        <ChatTypeSelectorContainer>
            <div
                className={`chat-type ${
                    activeType === GroupChatType.DM ? "active" : null
                }`}
                onClick={() => handleChatTypeSelect(GroupChatType.DM)}
            >
                <Heading type={3}>DM</Heading>
            </div>
            <div className="divider" />
            <div
                className={`chat-type ${
                    activeType === GroupChatType.Group ? "active" : null
                }`}
                onClick={() => handleChatTypeSelect(GroupChatType.Group)}
            >
                <Heading type={3}>Groups</Heading>
            </div>
        </ChatTypeSelectorContainer>
    );
};

interface IDirectMessageList {
    selectedChatType: GroupChatType;
    directChats: GroupChat[];
    groupChats: GroupChat[];
    setSelectedChat: React.Dispatch<React.SetStateAction<GroupChat>>;
}

const DirectMessageList = ({
    selectedChatType,
    directChats,
    groupChats,
    setSelectedChat
}: IDirectMessageList): JSX.Element => {
    const { user } = useUser();
    const [selectedChatId, setSelectedChatId] = useState<number>(0);
    const [selectedChatList, setSelectedChatList] = useState<GroupChat[]>([]);

    ////////////////////////////////////////////////////////////

    const handleChatSelection = (id: number): void => {
        setSelectedChat(selectedChatList[id]);
        setSelectedChatId(id);
    };

    useEffect(() => {
        setSelectedChatId(0);
        switch (selectedChatType) {
            case GroupChatType.DM:
                setSelectedChatList(directChats);
                setSelectedChat(directChats[0]);
                break;
            case GroupChatType.Group:
                setSelectedChatList(groupChats);
                setSelectedChat(groupChats[0]);
                break;
            default:
                setSelectedChatList(directChats);
                break;
        }
    }, [selectedChatType]);

    ////////////////////////////////////////////////////////////

    return (
        <ul className="list">
            {selectedChatList &&
                selectedChatList.map(({ members, internal_id }, count) => {
                    const otherMembers: ProfileType[] = members.filter(
                        (member) => member.username !== user!.username
                    );

                    const isActive = internal_id === selectedChatId;

                    return (
                        <DirectMessageEntry
                            key={count}
                            onClick={() => handleChatSelection(count)}
                            active={isActive}
                        >
                            <MemberList members={otherMembers} />
                        </DirectMessageEntry>
                    );
                })}
        </ul>
    );
};

interface IChatSelector {
    directChats: GroupChat[];
    groupChats: GroupChat[];
    selectedChat: GroupChat;
    setSelectedChat: React.Dispatch<React.SetStateAction<GroupChat>>;
}

const ChatSelector = ({
    directChats,
    groupChats,
    selectedChat,
    setSelectedChat
}: IChatSelector): JSX.Element => {
    const [selectedChatType, setSelectedChatType] = useState<GroupChatType>(
        GroupChatType.DM
    );

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatTypeSelector
                activeType={selectedChatType}
                setActiveType={setSelectedChatType}
            />

            <ChatInterface />
            {selectedChat && (
                <DirectMessageList
                    selectedChatType={selectedChatType}
                    setSelectedChat={setSelectedChat}
                    directChats={directChats}
                    groupChats={groupChats}
                />
            )}
        </Container>
    );
};

export default ChatSelector;
