// Components
import Asset from "../../components/Asset";
import Heading from "../../components/Heading";

// Auth
import { useAuth } from "../../contexts/AuthContext";

// Types
import { GroupChat, Profile } from "../../utils/GlobalTypes";

// Stylinh
import { Container, DirectMessageEntry } from "./DirectMessageList.style";

interface Props {
    directMessages: GroupChat[];
    selectedChat: number;
    setSelectedChat: React.Dispatch<React.SetStateAction<number>>;
}

const DirectMessageList = ({
    directMessages,
    selectedChat,
    setSelectedChat
}: Props) => {
    const { user } = useAuth();

    return (
        <Container>
            <div className="title">
                <Heading type={3}>Direct messages</Heading>
            </div>
            <ul className="list">
                {directMessages.map(({ members, messages }, count) => {
                    const otherMembers: Profile[] = members.filter(
                        (member) => member.username !== user!.username
                    );

                    return (
                        <DirectMessageEntry
                            key={count}
                            onClick={() => setSelectedChat(count)}
                            active={count === selectedChat}
                        >
                            <div className="content">
                                {otherMembers.map(
                                    ({ img_url, username }, count) => (
                                        <div className="profile" key={count}>
                                            <Asset
                                                url={img_url}
                                                alt="profile"
                                            />
                                            <span>{username}</span>
                                        </div>
                                    )
                                )}
                                <div className="activity">
                                    <div className="newMessage" />
                                </div>
                            </div>
                        </DirectMessageEntry>
                    );
                })}
            </ul>
        </Container>
    );
};

export default DirectMessageList;
