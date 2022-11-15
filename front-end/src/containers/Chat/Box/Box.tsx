// Types
import { GroupChat } from "../../../types/chat";

// UI
import ChatElement from "../../../components/ChatElements";
import ChatInput from "../Input";
import Heading from "../../../components/Heading";

// Styling
import { Container } from "./Box.style";

// Auth
import { useAuth } from "../../../contexts/AuthContext";
import { ProfileType } from "../../../types/profile";
import Asset from "../../../components/Asset";

////////////////////////////////////////////////////////////

interface Props {
    chat: GroupChat;
}

const ChatTitle = ({ chat }: Props): JSX.Element => {
    /**
     * If the the amount of members is 2 it means it a DM
     * Therefore we can change the interface from 'Chat' to 'other user name'
     */
    const { user } = useAuth();
    const isDmChat: boolean = chat.members.length === 2;
    const otherMember: ProfileType = chat.members
        .filter((member) => member.uid !== user.uid)
        .shift() as ProfileType;

    return (
        <div className="title">
            {isDmChat && (
                <Asset
                    alt={`${otherMember.username} profile`}
                    url={otherMember.img_url}
                />
            )}
            <Heading type={3}>
                {isDmChat ? `${otherMember.username}` : `Chat`}
            </Heading>
        </div>
    );
};

<<<<<<< Updated upstream
const ChatBox = ({ chat }: Props): JSX.Element => {
    const { user } = useAuth();

    return (
        <Container>
            <ChatTitle chat={chat} />

=======
interface IPasswordInput {
    setIsProtected: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordInput = ({ setIsProtected }: IPasswordInput) => {
    const passwordText = useFormInput("");
    const [passwordError, setPasswordError] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const sendPassword = async () => {
        try {
            const verifyResponse = await verifyPassword(passwordText.value);

            if (verifyResponse === false) {
                setPasswordError(false);
                return;
            }

            setIsProtected(true);
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////////

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
    const [isProtected, setIsProtected] = useState<boolean>(false);
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const isDmChat = chat.members.length === 2;

    const { user } = useUser();
    const { connection, createConnection, destroyConnectionInstance } =
        useSocket();

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        if (chat.protected === false) {
            setIsProtected(false);
            setIsUnlocked(true);
            return;
        }

        if (chat.protected === true) {
            setIsProtected(true);
            setIsUnlocked(false);
            return;
        }
    }, [chat.protected, chat]);

    ////////////////////////////////////////////////////////////

    // TODO: Abstract into business logic part
    useEffect(() => {
        createConnection(SocketType.SocketType.Chat);
    }, [chat]);

    useEffect(() => {
        if (!connection) return;
        setupConnections(connection);

        return () => {
            removeConnections(connection);
            destroyConnectionInstance();
        };
    }, [connection]);

    const sendMessage = () => {
        console.log(chat);
        connection.emit("sendMessage", chat);
    };

    ////////////////////////////////////////////////////////////

    const setupConnections = (socket: SocketType.Instance) => {
        socket.on(SocketRoutes.chat.receiveMessage(), (res) => {
            console.log(res);
        });
    };

    const removeConnections = (socket: SocketType.Instance) => {
        socket.off(SocketRoutes.chat.receiveMessage());
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <ChatTitle chat={chat} isDmChat={isDmChat} />
            <Button onClick={sendMessage}>Send standard message</Button>
>>>>>>> Stashed changes
            <div className="chat-content">
                {chat.messages.map((message, count) => (
                    <ChatElement
                        key={count}
                        message={message}
                        isDm={chat.members.length === 2}
                        fromUser={message.sender?.username === user.username}
                    />
                ))}
            </div>
            <ChatInput user={user!} groupchat={chat} />
        </Container>
    );
};

export default ChatBox;
