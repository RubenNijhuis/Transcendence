// React
import { useEffect, useState } from "react";

// Types
import * as Chat from "../../../types/Chat";
import * as SocketType from "../../../types/Socket";
import * as Profile from "../../../types/Profile";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";
import Asset from "../../../components/Asset";
import ChatSettings from "../Settings";

// Modal
import { useModal } from "../../../contexts/ModalContext";

// Styling
import { Container } from "./Box.style";

// User
import { useUser } from "../../../contexts/UserContext";

// Socket
import * as SocketRoutes from "../../../config/SocketRoutes";
import { useSocket } from "../../../contexts/SocketContext";

// Proxies
import { getChatByGroupId } from "../../../proxies/chat";
import { useChat } from "../../../contexts/ChatContext";
import {
    bindMembersToMessages,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "../../../contexts/ChatContext/ChatContext.bl";
import OnlineMembers from "../OnlineMembers";
import PasswordInput from "../PasswordInput";
import Button from "../../../components/Button";
import { backgroundColor, smallRadius } from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

interface IChatTitle {
    chat: Chat.Group.Instance;
    isLocked: boolean;
}

const ChatTitle = ({ chat, isLocked }: IChatTitle): JSX.Element => {
    const { user } = useUser();

    const { openModal, setModalElement } = useModal();

    ////////////////////////////////////////////////////////

    /**
     * If the the amount of members is 2 it means it a DM
     * Therefore we can change the interface from 'Chat' to 'other user name'
     */
    const otherMember: Chat.Member = chat.members
        .filter((member: Chat.Member) => member.profile.uid !== user.uid)
        .shift() as Chat.Member;

    const chatTitle: string = (
        chat.size === Chat.Group.Type.DM
            ? otherMember.profile.username
            : chat.name
    ) as string;

    ////////////////////////////////////////////////////////

    const openSettingsPanel = () => {
        setModalElement(<ChatSettings chat={chat} user={user} />);
        openModal(true);
    };

    const isAdministrator = (memberUid: string) => {
        for (const member of chat.members) {
            const memberIsAnAdmin =
                member.permissions === Chat.Group.Permission.Admin;
            const memberIsUser = member.profile.uid === memberUid;

            if (chat.owner === memberUid || (memberIsUser && memberIsAnAdmin)) {
                return true;
            }
        }

        return false;
    };

    ////////////////////////////////////////////////////////

    return (
        <div className="chat-title">
            <div className="title">
                {chat.size === Chat.Group.Type.DM && (
                    <Asset
                        alt={`${otherMember.profile.username} profile`}
                        url={otherMember.profile.img_url}
                    />
                )}
                <Heading type={3}>{chatTitle}</Heading>
            </div>
            {!isLocked &&
                isAdministrator(user.uid) &&
                chat.size === Chat.Group.Type.Group && (
                    <div
                        className="settings"
                        style={{
                            border: `solid 2px ${backgroundColor}`,
                            borderRadius: `${smallRadius}`
                        }}
                    >
                        <Button onClick={openSettingsPanel}>Settings</Button>
                    </div>
                )}
        </div>
    );
};

interface IChatContent {
    messages: Chat.Message.Instance[];
    isDmChat: boolean;
}

const ChatContent = ({ messages, isDmChat }: IChatContent) => {
    const { user } = useUser();

    return (
        <div className="chat-content">
            {messages.reverse().map((message) => {
                return (
                    <ChatElement
                        key={message.id}
                        message={message}
                        isDm={isDmChat}
                        fromUser={message.sender.uid === user.uid}
                    />
                );
            })}
        </div>
    );
};

const ChatBox = (): JSX.Element => {
    const [chat, setChat] = useState<Chat.Group.Instance>(null!);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [isDmChat, setIsDmChat] = useState<boolean>(false);

    const [onlineMembers, setOnlineMembers] = useState<Profile.ID[]>([]);
    const [connectionMessages, setConnectionMessages] = useState<
        Chat.Message.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const { activeChatId, updateChatGroup } = useChat();
    const { user } = useUser();
    const { chatConnection } = useSocket();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!activeChatId) return;
        const updateChat = async () => {
            try {
                const newRetrievedChat = await getChatByGroupId(activeChatId);

                const members = await getMembersFromGroupChats([
                    newRetrievedChat
                ]);
                const messages = getMessagesFromGroupChats([newRetrievedChat]);

                bindMembersToMessages(members, messages);
                newRetrievedChat.members = members.flat();

                if (newRetrievedChat.members.length === 2) {
                    newRetrievedChat.size = Chat.Group.Type.DM;
                } else {
                    newRetrievedChat.size = Chat.Group.Type.Group;
                }

                updateChatGroup(newRetrievedChat);

                setChat(newRetrievedChat);
                setIsDmChat(newRetrievedChat.members.length === 2);

                setIsLocked(newRetrievedChat.protected);
                setConnectionMessages([]);
            } catch (err) {
                console.error(err);
            }
        };

        updateChat();
    }, [activeChatId]);

    ////////////////////////////////////////////////////////

    useEffect(() => {
        if (!chatConnection || !chat) return;

        setupConnections(chatConnection);
        chatConnection.emit(SocketRoutes.room.joinRoom, {
            roomID: chat.uid
        });

        return () => {
            removeConnections(chatConnection);
        };
    }, [chatConnection, chat]);

    ////////////////////////////////////////////////////////

    const setupConnections = (socket: SocketType.Instance) => {
        // On receive a message
        socket.on(
            SocketRoutes.chat.receiveMessage,
            (newMessage: Chat.Message.Instance) => {
                const sender = chat.members.find(
                    (member: Chat.Member) =>
                        member.memberId === newMessage.senderID
                );

                if (!sender) return;

                newMessage.sender = sender.profile;
                setConnectionMessages((prev) => [...prev, newMessage]);
            }
        );

        socket.on(SocketRoutes.room.onlineMembers, (res) => {
            setOnlineMembers(
                res.members.filter((item: string) => item !== user.uid)
            );
        });

        socket.on("connect", () => {
            chatConnection.emit(SocketRoutes.room.joinRoom, {
                roomID: chat.uid
            });
        });
    };

    const removeConnections = (socket: SocketType.Instance) => {
        socket.off(SocketRoutes.chat.receiveMessage);
    };

    ////////////////////////////////////////////////////////

    return (
        <Container>
            {chat && (
                <>
                    <ChatTitle chat={chat} isLocked={isLocked} />
                    <OnlineMembers
                        chatMembers={chat.members}
                        onlineMembers={onlineMembers}
                    />
                    {!isLocked && (
                        <ChatContent
                            isDmChat={isDmChat}
                            messages={[...chat.messages, ...connectionMessages]}
                        />
                    )}
                    {isLocked && (
                        <PasswordInput
                            setIsLocked={setIsLocked}
                            chatUid={chat.uid}
                        />
                    )}
                    {!isLocked && <ChatInput user={user} chat={chat} />}
                </>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatBox;
