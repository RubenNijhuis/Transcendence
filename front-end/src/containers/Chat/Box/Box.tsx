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
import { verifyPassword } from "../../../proxies/chat";
import { useModal } from "../../../contexts/ModalContext";

////////////////////////////////////////////////////////////

interface IChatTitle {
    chat: Chat.Group.Instance;
    isDmChat: boolean;
    isUnlocked: boolean;
}

const ChatTitle = ({ chat, isDmChat, isUnlocked }: IChatTitle): JSX.Element => {
    const { user } = useUser();

    const { setModalActive, setModalElement } = useModal();

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
        setModalActive(true);
    };

    const isAdministrator = () => {
        for (const member of chat.members) {
            const memberIsAnAdmin =
                member.permissions === Chat.Group.Permission.Admin;
            const memberIsUser = member.profile.uid === user.uid;

            if (memberIsUser && memberIsAnAdmin) return true;
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
            {isUnlocked && isAdministrator() && (
                <div className="settings">
                    <button onClick={openSettingsPanel}>Settings</button>
                </div>
            )}
        </div>
    );
};

interface IPasswordInput {
    setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
    activeChat: Chat.Group.Instance;
}

const PasswordInput = ({ activeChat, setIsUnlocked }: IPasswordInput) => {
    const passwordText = useFormInput("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    ////////////////////////////////////////////////////////

    const sendPassword = async () => {
        try {
            // const verifyResponse = await verifyPassword(
            //     activeChat.uid,
            //     passwordText.value
            // );

            // if (verifyResponse === false) {
            //     setPasswordError(false);
            //     return;
            // }

            setIsUnlocked(true);
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

interface IChatBox {
    chat: Chat.Group.Instance;
}

const ChatBox = ({ chat }: IChatBox): JSX.Element => {
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

    const [connectionMessages, setConnectionMessages] = useState<
        Chat.Message.Instance[]
    >([]);

    ////////////////////////////////////////////////////////

    const isDmChat = chat.members.length === 2;

    const { user } = useUser();
    const { connection, createConnection, destroyConnectionInstance } =
        useSocket();

    ////////////////////////////////////////////////////////

    useEffect(() => {
        // Only allow viewing of messages when the chat is unlocked
        setIsUnlocked(!chat.protected);
    }, [chat.protected, chat]);

    ////////////////////////////////////////////////////////

    useEffect(() => {
        // Setup the socket connnection to retrieve real-time messages
        createConnection(SocketType.Type.Chat);
        setConnectionMessages([]);
    }, [chat]);

    useEffect(() => {
        if (!connection) return;
        setupConnections(connection);

        connection.emit(SocketRoutes.room.joinRoom, {
            roomID: chat.uid
        });

        return () => {
            removeConnections(connection);
            destroyConnectionInstance();
        };
    }, [connection]);

    ////////////////////////////////////////////////////////

    const setupConnections = (socket: SocketType.Instance) => {
        socket.on(
            SocketRoutes.chat.receiveMessage,
            (newMessage: Chat.Message.Instance) => {
                if (!newMessage) return;

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
            <ChatTitle
                chat={chat}
                isDmChat={isDmChat}
                isUnlocked={isUnlocked}
            />
            <div className="chat-content">
                {isUnlocked && (
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
                                            message.sender.uid === user.uid
                                        }
                                    />
                                );
                            })}
                    </>
                )}

                {!isUnlocked && (
                    <PasswordInput
                        setIsUnlocked={setIsUnlocked}
                        activeChat={chat}
                    />
                )}
            </div>
            {isUnlocked && <ChatInput user={user} chat={chat} />}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatBox;
