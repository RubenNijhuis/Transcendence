// React
import { useEffect, useState } from "react";

// Contexts
import { useUser } from "../../../contexts/UserContext";

// UI
import Asset from "../../../components/Asset";
import Heading from "../../../components/Heading";
import ChatInterface from "../CreateGroup";

// Types
import * as Chat from "../../../types/Chat";

// Styling
import {
    ChatTypeSelectorContainer,
    Container,
    DirectMessageEntry,
    DirectMessageList
} from "./ChatSelector.style";
import { useChat } from "../../../contexts/ChatContext";

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
            {members.map(({ profile }) => {
                const { img_url, uid } = profile;
                return (
                    <li className="profile" key={uid}>
                        <Asset url={img_url} alt="profile" />
                    </li>
                );
            })}
        </ul>
    );
};

////////////////////////////////////////////////////////////

interface IChatTypeSelector {
    activeType: Chat.Group.Type;
    setActiveType: React.Dispatch<React.SetStateAction<Chat.Group.Type>>;
}
/**
 * UI Box that let's the user switch between the dm's and groups
 */
const ChatTypeSelector = ({
    activeType,
    setActiveType
}: IChatTypeSelector): JSX.Element => {
    const isActiveChatSelect = (type: Chat.Group.Type): string => {
        if (type === activeType) return "active";
        else return "";
    };

    ////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////

interface IDirectMessageList {
    selectedChatType: Chat.Group.Type;
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}

/**
 * My bad awful name for the component but
 * displays the list of groups or dms
 */
const ChatGroupList = ({
    selectedChatType,
    groupChats,
    setSelectedChat
}: IDirectMessageList): JSX.Element => {
    const [selectedChatList, setSelectedChatList] = useState<
        Chat.Group.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();
    const { setActiveChatId, activeChatId } = useChat();

    ////////////////////////////////////////////////////////

    const handleChatSelection = (id: string): void => {
        setActiveChatId(id);
    };

    useEffect(() => {
        setSelectedChatList(() => {
            const chats = groupChats.filter((item) => {
                if (selectedChatType === Chat.Group.Type.DM) {
                    return item.size === Chat.Group.Type.DM;
                } else {
                    return item.size === Chat.Group.Type.Group;
                }
            });
            return chats;
        });
    }, [selectedChatType, groupChats]);

    ////////////////////////////////////////////////////////

    return (
        <>
            {selectedChatList.length && (
                <DirectMessageList>
                    {selectedChatList.map(({ name, members, uid }) => {
                        const otherMembers: Chat.Member[] = members.filter(
                            (member) =>
                                member.profile.username !== user!.username
                        );

                        const isSelectedChat = uid === activeChatId;
                        const isDm = members.length <= 2;

                        /**
                         * If it's a dm we display the other members name.
                         * Ortherwise the group name
                         */
                        const chatGroupName = isDm
                            ? otherMembers[0].profile.username
                            : name;

                        return (
                            <DirectMessageEntry
                                key={uid}
                                onClick={() => handleChatSelection(uid)}
                                active={isSelectedChat}
                            >
                                <Heading type={5}>{chatGroupName}</Heading>
                                <MemberList members={otherMembers} />
                            </DirectMessageEntry>
                        );
                    })}
                </DirectMessageList>
            )}
        </>
    );
};

////////////////////////////////////////////////////////////

interface IChatSelector {
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatSelector = ({
    groupChats,
    setSelectedChat
}: IChatSelector): JSX.Element => {
    const [selectedChatType, setSelectedChatType] = useState<Chat.Group.Type>(
        Chat.Group.Type.DM
    );

    ////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatInterface />

            {groupChats && (
                <>
                    <ChatTypeSelector
                        activeType={selectedChatType}
                        setActiveType={setSelectedChatType}
                    />
                    <ChatGroupList
                        selectedChatType={selectedChatType}
                        setSelectedChat={setSelectedChat}
                        groupChats={groupChats}
                    />
                </>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatSelector;
