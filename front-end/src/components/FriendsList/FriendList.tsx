// Types
import { Link } from "react-router-dom";
import { Profile } from "../../types";

// UI
import Asset from "../Asset";
import Heading from "../Heading";

// Styling
import { Container, FriendEntryContainer } from "./FriendList.style";

////////////////////////////////////////////////////////////

interface IFriendEntry {
    friend: Profile.Instance;
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
    friends: Profile.Instance[];
}

const FriendList = ({ friends }: IFriendList) => {
    return (
        <Container>
            <Heading type={3}>Friends</Heading>
            {friends && (
                <ul className="friends-list">
                    {friends.map((friend) => (
                        <FriendEntry friend={friend} key={friend.uid} />
                    ))}
                </ul>
            )}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default FriendList;
