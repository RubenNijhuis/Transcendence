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
    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<
        React.SetStateAction<Chat.Group.Instance | null>
    >;
}

/**
 * My bad awful name for the component but
 * displays the list of groups or dms
 */
const ChatGroupList = ({
    selectedChatType,
    directChats,
    groupChats,
    setSelectedChat
}: IDirectMessageList): JSX.Element => {
    const [selectedChatId, setSelectedChatId] = useState<number>(0);
    const [selectedChatList, setSelectedChatList] = useState<
        Chat.Group.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

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

    ////////////////////////////////////////////////////////

    return (
        <DirectMessageList>
            {selectedChatList.map(({ name, members, internal_id }) => {
                const otherMembers: Chat.Member[] = members.filter(
                    (member) => member.profile.username !== user!.username
                );

                const isSelectedChat = internal_id === selectedChatId;
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
                        key={internal_id}
                        onClick={() => handleChatSelection(internal_id)}
                        active={isSelectedChat}
                    >
                        <Heading type={5}>{chatGroupName}</Heading>
                        <MemberList members={otherMembers} />
                    </DirectMessageEntry>
                );
            })}
        </DirectMessageList>
    );
};

////////////////////////////////////////////////////////////

interface IChatSelector {
    directChats: Chat.Group.Instance[];
    groupChats: Chat.Group.Instance[];
    setSelectedChat: React.Dispatch<
        React.SetStateAction<Chat.Group.Instance | null>
    >;
}

const ChatSelector = ({
    directChats,
    groupChats,
    setSelectedChat
}: IChatSelector): JSX.Element => {
    const [selectedChatType, setSelectedChatType] = useState<Chat.Group.Type>(
        Chat.Group.Type.Group
    );

    ////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatInterface />

            {(directChats.length || groupChats.length) && (
                <>
                    <ChatTypeSelector
                        activeType={selectedChatType}
                        setActiveType={setSelectedChatType}
                    />
                    <ChatGroupList
                        selectedChatType={selectedChatType}
                        setSelectedChat={setSelectedChat}
                        directChats={directChats}
                        groupChats={groupChats}
                    />
                </>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatSelector;
