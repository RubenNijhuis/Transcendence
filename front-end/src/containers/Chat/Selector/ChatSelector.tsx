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
    DirectMessageEntry,
    DirectMessageList
} from "./ChatSelector.style";
import ChatInterface from "../CreateGroup";
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface IMemberList {
    members: Chat.Member[];
}

/**
 * Display the members of a chat in the group list
 */
const MemberList = ({ members }: IMemberList): JSX.Element => {
    return (
        <ul>
            {members.map(({ user }) => {
                const { img_url, uid, username } = user;
                return (
                    <li className="profile" key={uid}>
                        <Asset url={img_url} alt="profile" />
                        <span>{username}</span>
                    </li>
                );
            })}
        </ul>
    );
};

interface IChatTypeSelector {
    activeType: Chat.Group.Type;
    setActiveType: React.Dispatch<React.SetStateAction<Chat.Group.Type>>;
}

const ChatTypeSelector = ({
    activeType,
    setActiveType
}: IChatTypeSelector): JSX.Element => {
    const isActiveChatSelect = (type: Chat.Group.Type): string => {
        if (type === activeType) return "active";
        else return "";
    };

    ////////////////////////////////////////////////////////////

    return (
        <ChatTypeSelectorContainer>
            <div
                className={`chat-type ${isActiveChatSelect(
                    Chat.Group.Type.DM
                )}`}
                onClick={() => setActiveType(Chat.Group.Type.DM)}
            >
                <Heading type={3}>DM</Heading>
            </div>
            <div className="divider" />
            <div
                className={`chat-type ${isActiveChatSelect(
                    Chat.Group.Type.Group
                )}`}
                onClick={() => setActiveType(Chat.Group.Type.Group)}
            >
                <Heading type={3}>Groups</Heading>
            </div>
        </ChatTypeSelectorContainer>
    );
};

interface IDirectMessageList {
    selectedChatType: Chat.Group.Type;
    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<React.SetStateAction<Chat.Group.Instance>>;
}

const DirectMessages = ({
    selectedChatType,
    directChats,
    groupChats,
    setSelectedChat
}: IDirectMessageList): JSX.Element => {
    const [selectedChatId, setSelectedChatId] = useState<number>(0);
    const [selectedChatList, setSelectedChatList] = useState<
        Chat.Group.Instance[]
    >([]);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const handleChatSelection = (id: number): void => {
        setSelectedChat(selectedChatList[id]);
        setSelectedChatId(id);
    };

    useEffect(() => {
        setSelectedChatId(0);

        switch (selectedChatType) {
            case Chat.Group.Type.DM:
                setSelectedChatList(directChats);
                if (directChats.length !== 0) setSelectedChat(directChats[0]);
                break;
            case Chat.Group.Type.Group:
                if (groupChats.length !== 0) setSelectedChatList(groupChats);
                setSelectedChat(groupChats[0]);
                break;
        }
    }, [selectedChatType]);

    ////////////////////////////////////////////////////////////

    return (
        <DirectMessageList>
            {selectedChatList &&
                selectedChatList.map(({ name, members, internal_id }) => {
                    const otherMembers: Chat.Member[] = members.filter(
                        (member) => member.user.username !== user!.username
                    );

                    const isActive = internal_id === selectedChatId;

                    return (
                        <DirectMessageEntry
                            key={internal_id}
                            onClick={() => handleChatSelection(internal_id)}
                            active={isActive}
                        >
                            <>
                                {members.length > 2 ? (
                                    name
                                ) : (
                                    <MemberList members={otherMembers} />
                                )}
                            </>
                            <MemberList members={otherMembers} />
                        </DirectMessageEntry>
                    );
                })}
        </DirectMessageList>
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
    const [selectedChatType, setSelectedChatType] = useState<Chat.Group.Type>(
        Chat.Group.Type.Group
    );

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatTypeSelector
                activeType={selectedChatType}
                setActiveType={setSelectedChatType}
            />

            <ChatInterface />

            <DirectMessages
                selectedChatType={selectedChatType}
                setSelectedChat={setSelectedChat}
                directChats={directChats}
                groupChats={groupChats}
            />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatSelector;
