// React
import { useEffect, useState } from "react";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";

// Types
import { Profile, Chat } from "../../../types";

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
    members: Profile.Instance[];
}

/**
 * Display the members of a chat in the group list
 */
const MemberList = ({ members }: IMemberList): JSX.Element => {
    return (
        <div>
            {members.map(({ img_url, username, uid }) => (
                <div className="profile" key={uid}>
                    <Asset url={img_url} alt="profile" />
                    <span>{username}</span>
                </div>
            ))}
        </div>
    );
};

interface IChatTypeSelector {
    activeType: Chat.Group.GroupType;
    setActiveType: React.Dispatch<React.SetStateAction<Chat.Group.GroupType>>;
}

const ChatTypeSelector = ({
    activeType,
    setActiveType
}: IChatTypeSelector): JSX.Element => {
    const handleChatTypeSelect = (type: Chat.Group.GroupType): void => {
        setActiveType(type);
    };

    ////////////////////////////////////////////////////////////

    return (
        <ChatTypeSelectorContainer>
            <div
                className={`chat-type ${
                    activeType === Chat.Group.GroupType.DM ? "active" : null
                }`}
                onClick={() => handleChatTypeSelect(Chat.Group.GroupType.DM)}
            >
                <Heading type={3}>DM</Heading>
            </div>
            <div className="divider" />
            <div
                className={`chat-type ${
                    activeType === Chat.Group.GroupType.Group ? "active" : null
                }`}
                onClick={() => handleChatTypeSelect(Chat.Group.GroupType.Group)}
            >
                <Heading type={3}>Groups</Heading>
            </div>
        </ChatTypeSelectorContainer>
    );
};

interface IDirectMessageList {
    selectedChatType: Chat.Group.GroupType;
    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat.Group.Instance>>;
}

const DirectMessageList = ({
    selectedChatType,
    directChats,
    groupChats,
    setSelectedChat
}: IDirectMessageList): JSX.Element => {
    const { user } = useUser();
    const [selectedChatId, setSelectedChatId] = useState<number>(0);
    const [selectedChatList, setSelectedChatList] = useState<
        Chat.Group.Instance[]
    >([]);

    ////////////////////////////////////////////////////////////

    const handleChatSelection = (id: number): void => {
        setSelectedChat(selectedChatList[id]);
        setSelectedChatId(id);
    };

    useEffect(() => {
        setSelectedChatId(0);
        switch (selectedChatType) {
            case Chat.Group.GroupType.DM:
                setSelectedChatList(directChats);
                setSelectedChat(directChats[0]);
                break;
            case Chat.Group.GroupType.Group:
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
                selectedChatList.map(({ members, internal_id }) => {
                    const otherMembers: Profile.Instance[] = members.filter(
                        (member) => member.username !== user!.username
                    );

                    const isActive = internal_id === selectedChatId;

                    return (
                        <DirectMessageEntry
                            key={internal_id}
                            onClick={() => handleChatSelection(internal_id)}
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
    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
    selectedChat: Chat.Group.Instance;
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat.Group.Instance>>;
}

const ChatSelector = ({
    directChats,
    groupChats,
    selectedChat,
    setSelectedChat
}: IChatSelector): JSX.Element => {
    const [selectedChatType, setSelectedChatType] =
        useState<Chat.Group.GroupType>(Chat.Group.GroupType.DM);

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

////////////////////////////////////////////////////////////

export default ChatSelector;
