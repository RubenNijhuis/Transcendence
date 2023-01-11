// React
import { useEffect, useState } from "react";

// Types
import * as Chat from "../../../types/Chat";
import * as SocketType from "../../../types/Socket";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";
import Asset from "../../../components/Asset";
import Button from "../../../components/Button";
import ChatSettings from "../Settings";

// Modal
import { useModal } from "../../../contexts/ModalContext";

// Styling
import { Container, PasswordLayer } from "./Box.style";

// Types
import * as Profile from "../../../types/Profile";

// User
import { useUser } from "../../../contexts/UserContext";

// Socket
import * as SocketRoutes from "../../../config/SocketRoutes";
import { useSocket } from "../../../contexts/SocketContext";

// Form hooks
import { useFormInput } from "../../../components/Form/hooks";

// Proxies
import { verifyPassword, getChatByGroupId } from "../../../proxies/chat";
import { useChat } from "../../../contexts/ChatContext";
import {
    bindMembersToMessages,
    getMembersFromGroupChats,
    getMessagesFromGroupChats
} from "../../../contexts/ChatContext/ChatContext.bl";

////////////////////////////////////////////////////////////

interface IChatTitle {
    chat: Chat.Group.Instance;
    isDmChat: boolean;
    isLocked: boolean;
}

const ChatTitle = ({ chat, isDmChat, isLocked }: IChatTitle): JSX.Element => {
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
        isDmChat ? otherMember.profile.username : chat.name
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

            if (memberIsUser && memberIsAnAdmin) {
                return true;
            }
        }

        return false;
    };

    ////////////////////////////////////////////////////////

    return (
        <div className="chat-title">
            <div className="title">
                {isDmChat && (
                    <Asset
                        alt={`${otherMember.profile.username} profile`}
                        url={otherMember.profile.img_url}
                    />
                )}
                <Heading type={3}>{chatTitle}</Heading>
            </div>
            {isLocked && isAdministrator(user.uid) && (
                <div className="settings">
                    <button onClick={openSettingsPanel}>Settings</button>
                </div>
            )}
        </div>
    );
};

interface IPasswordInput {
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
    chatUid: string;
}

const PasswordInput = ({ chatUid, setIsLocked }: IPasswordInput) => {
    const passwordText = useFormInput("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    ////////////////////////////////////////////////////////

    const sendPassword = async () => {
        try {
            const verifyResponse = await verifyPassword(
                chatUid,
                passwordText.value
            );

            if (verifyResponse === false) {
                setPasswordError(false);
                return;
            }
            setIsLocked(true);
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////

    return (
        <PasswordLayer>
            {passwordError && (
                <div className="error">The password is incorrect</div>
            )}
            <Heading type={3}>Please put in the password for this chat</Heading>
            <input type="password" {...passwordText} />
            <Button onClick={sendPassword}>Verify password</Button>
        </PasswordLayer>
    );
};

const ChatBox = (): JSX.Element => {
    const [chat, setChat] = useState<Chat.Group.Instance>(null!);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [isDmChat, setIsDmChat] = useState<boolean>(false);

    const [connectionMessages, setConnectionMessages] = useState<
        Chat.Message.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const { activeChatId, updateChatGroup } = useChat();
    const { user } = useUser();
    const { connection } = useSocket();

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
        if (!connection || !chat) return;

        setupConnections(connection);
        connection.emit(SocketRoutes.room.joinRoom, {
            roomID: chat.uid
        });

        return () => {
            removeConnections(connection);
        };
    }, [connection, chat]);

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
    };

    const removeConnections = (socket: SocketType.Instance) => {
        socket.off(SocketRoutes.chat.receiveMessage);
    };

    ////////////////////////////////////////////////////////

    return (
        <Container>
            {chat && (
                <>
                    <ChatTitle
                        chat={chat}
                        isDmChat={isDmChat}
                        isLocked={isLocked}
                    />
                    <div className="chat-content">
                        {!isLocked && (
                            <>
                                {[...chat.messages, ...connectionMessages]
                                    .reverse()
                                    .map((message) => {
                                        return (
                                            <ChatElement
                                                key={message.id}
                                                message={message}
                                                isDm={isDmChat}
                                                fromUser={
                                                    message.sender.uid ===
                                                    user.uid
                                                }
                                            />
                                        );
                                    })}
                            </>
                        )}

                        {isLocked && (
                            <PasswordInput
                                setIsLocked={setIsLocked}
                                chatUid={chat.uid}
                            />
                        )}
                    </div>
                    {!isLocked && <ChatInput user={user} chat={chat} />}
                </>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatBox;
