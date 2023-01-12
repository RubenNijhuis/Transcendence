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
        return type === activeType ? "active" : "";
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
}

/**
 * My bad awful name for the component but
 * displays the list of groups or dms
 */
const ChatGroupList = ({
    selectedChatType
}: IDirectMessageList): JSX.Element => {
    const [selectedChatList, setSelectedChatList] = useState<
        Chat.Group.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();
    const { setActiveChatId, activeChatId, groupChats } = useChat();

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
                    {selectedChatList.map(({ name, members, uid, size }) => {
                        const otherMembers: Chat.Member[] = members.filter(
                            (member) =>
                                member.profile.username !== user!.username
                        );

                        const isSelectedChat = uid === activeChatId;

                        /**
                         * If it's a dm we display the other members name.
                         * Ortherwise the group name
                         */
                        const chatGroupName =
                            size === Chat.Group.Type.DM
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

const ChatSelector = (): JSX.Element => {
    const [selectedChatType, setSelectedChatType] = useState<Chat.Group.Type>(
        Chat.Group.Type.DM
    );

    const { groupChats } = useChat();

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
                    <ChatGroupList selectedChatType={selectedChatType} />
                </>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatSelector;
