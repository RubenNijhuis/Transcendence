// Types
import { Link } from "react-router-dom";
import { ProfileType } from "../../types/profile";

// UI
import Asset from "../Asset";
import Heading from "../Heading";

// Styling
import { Container, FriendEntryContainer } from "./FriendList.style";

////////////////////////////////////////////////////////////

interface IFriendEntry {
    friend: ProfileType;
}

const FriendEntry = ({ friend }: IFriendEntry) => {
    const { img_url, username } = friend;

    return (
        <FriendEntryContainer>
            <Link to={`/profile/${friend.username}`}>
                <Asset
                    url={img_url}
                    alt={`${username}`}
                    className="friend-img"
                />
                <p className="name">{username}</p>
            </Link>
        </FriendEntryContainer>
    );
};

interface IFriendList {
    friends: ProfileType[];
}

const FriendList = ({ friends }: IFriendList) => {
    return (
        <Container>
            <Heading type={3}>Friends</Heading>
            <ul className="friends-list">
                {friends.map((friend, count) => (
                    <FriendEntry friend={friend} key={count} />
                ))}
            </ul>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default FriendList;
