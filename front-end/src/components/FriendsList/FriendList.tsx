// Types
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { acceptFriendRequest } from "../../proxies/friend/acceptFriendRequests";
import { getFriendRequestsByUsername } from "../../proxies/friend/getFriendRequestsByUsername";
import * as Profile from "../../types/Profile";

// UI
import Asset from "../Asset";
import Button from "../Button";
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

interface IFriendRequest {
    friend: Profile.Instance;
    setFriendRequests: React.Dispatch<React.SetStateAction<Profile.Instance[]>>;
}

const FriendRequestEntry = ({ friend, setFriendRequests }: IFriendRequest) => {
    const resolveFriendRequest = async (friendUsername: string) => {
        try {
            await acceptFriendRequest(friendUsername);
            setFriendRequests((prev) =>
                prev.filter((profile) => profile.username !== friend.username)
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Asset url={friend.img_url} alt={friend.username} />
            <Button onClick={() => resolveFriendRequest(friend.username)}>
                Accept friend request
            </Button>
        </div>
    );
};

interface IFriendList {
    friends: Profile.Instance[];
    withFriendRequests: boolean;
}

const FriendList = ({ friends, withFriendRequests }: IFriendList) => {
    const [friendRequests, setFriendRequests] = useState<Profile.Instance[]>(
        []
    );

    const { user } = useUser();

    useEffect(() => {
        if (!withFriendRequests) return;
        const getFriendRequests = async () => {
            try {
                const retrievedFriendRequests =
                    await getFriendRequestsByUsername(user.username);
                setFriendRequests(retrievedFriendRequests);
            } catch (err) {
                console.error(err);
            }
        };

        getFriendRequests();
    }, []);

    return (
        <Container>
            <Heading type={3}>Friends</Heading>
            {withFriendRequests && (
                <ul className="friend-requests">
                    {friendRequests.map((friend) => (
                        <FriendRequestEntry
                            friend={friend}
                            setFriendRequests={setFriendRequests}
                        />
                    ))}
                </ul>
            )}
            <ul className="friends-list">
                {friends.map((friend) => (
                    <FriendEntry friend={friend} key={friend.uid} />
                ))}
            </ul>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default FriendList;
