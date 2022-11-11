// Types
import { Chat, SocketType } from "../../../types";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";
import Asset from "../../../components/Asset";

// Styling
import { Container, PasswordLayer } from "./Box.style";

// Types
import { Profile } from "../../../types";

// User
import { useUser } from "../../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useFormInput } from "../../../components/Form/hooks";
import Button from "../../../components/Button";
import { useSocket } from "../../../contexts/SocketContext";
import SocketRoutes from "../../../config/SocketRoutes";

////////////////////////////////////////////////////////////

interface IChatTitle {
    chat: Chat.Group.Instance;
    isDmChat: boolean;
}

const ChatTitle = ({ chat, isDmChat }: IChatTitle): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    /**
     * If the the amount of members is 2 it means it a DM
     * Therefore we can change the interface from 'Chat' to 'other user name'
     */
    const otherMember: Profile.Instance = chat.members
        .filter((member: Profile.Instance) => member.uid !== user.uid)
        .shift() as Profile.Instance;

    const chatTitle: string = (
        isDmChat ? otherMember.username : chat.name
    ) as string;

    ////////////////////////////////////////////////////////////

    return (
        <div className="title">
            {isDmChat && (
                <Asset
                    alt={`${otherMember.username} profile`}
                    url={otherMember.img_url}
                />
            )}
            <Heading type={3}>{chatTitle}</Heading>
        </div>
    );
};

interface IPasswordInput {
    setUnlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput = ({ setUnlocked }: IPasswordInput) => {
    const passwordText = useFormInput("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const verifyPassword = async () => {
        //     try {
        //         const verifyResponse = await verifyPassword(passwordText.value);
        //         if (verifyResponse === false) {
        //             setPasswordError(false);
        //         }
        //         setUnlocked(true);
        //     } catch (err) {
        //         console.error(err);
        //     }
    };

    ////////////////////////////////////////////////////////////

    return (
        <PasswordLayer>
            {passwordError && (
                <div className="error">The password is incorrect</div>
            )}
            <Heading type={3}>Please put in the password for this chat</Heading>
            <input {...passwordText} />
            <Button onClick={verifyPassword}>Verify password</Button>
        </PasswordLayer>
    );
};

interface IChatBox {
    chat: Chat.Group.Instance;
}

const ChatBox = ({ chat }: IChatBox): JSX.Element => {
    const [unlocked, setUnlocked] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const isDmChat = chat.members.length === 2;

    const { user } = useUser();
    const { connection, createConnection, destroyConnectionInstance } =
        useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (chat.protected === false) {
            setUnlocked(true);
            setUnlocked(false);
            return;
        }
    }, [chat.protected]);

    ////////////////////////////////////////////////////////////

    // TODO: Abstract into business logic part
    useEffect(() => {
        if (unlocked === false) return;

        createConnection(SocketType.SocketType.Game);
    }, []);

    useEffect(() => {
        if (!connection) return;
        setupConnections(connection);

        return () => {
            removeConnections(connection);
            destroyConnectionInstance();
        };
    }, [connection]);

    ////////////////////////////////////////////////////////////

    const setupConnections = (socket: SocketType.Instance) => {
        socket.on(SocketRoutes.chat.sendMessage(), () => {});
        socket.on(SocketRoutes.chat.receiveMessage(), () => {});
    };

    const removeConnections = (socket: SocketType.Instance) => {
        socket.off(SocketRoutes.chat.sendMessage());
        socket.off(SocketRoutes.chat.receiveMessage());
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatTitle chat={chat} isDmChat={isDmChat} />

            <div className="chat-content">
                {unlocked &&
                    chat.messages.map((message, count) => (
                        <ChatElement
                            key={count}
                            message={message}
                            isDm={isDmChat}
                            fromUser={message.sender.uid === user.uid}
                        />
                    ))}
                {!unlocked && <PasswordInput setUnlocked={setUnlocked} />}
            </div>
            <ChatInput user={user} groupchat={chat} />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ChatBox;
