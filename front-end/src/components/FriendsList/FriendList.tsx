// React
import { useEffect, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Types
import * as Profile from "../../types/Profile";

// Proxies
import { acceptFriendRequest } from "../../proxies/friend/acceptFriendRequests";
import { getRequested } from "../../proxies/friend/getRequested";

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
        <div className="item">
            <Asset url={friend.img_url} alt={friend.username} />
            <span>{friend.username}</span>
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

    useEffect(() => {
        if (!withFriendRequests) return;
        const getFriendRequests = async () => {
            try {
                const retrievedFriendRequests = await getRequested();
                setFriendRequests(retrievedFriendRequests);
            } catch (err) {
                console.error(err);
            }
        };

        getFriendRequests();
    }, []);

    return (
        <Container>
            {withFriendRequests && friendRequests.length ? (
                <div>
                    <Heading type={3}>Requests</Heading>
                    <ul className="friend-requests">
                        {friendRequests.map((friend) => (
                            <FriendRequestEntry
                                key={friend.uid}
                                friend={friend}
                                setFriendRequests={setFriendRequests}
                            />
                        ))}
                    </ul>
                </div>
            ) : null}
            <Heading type={3}>Friends</Heading>
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
