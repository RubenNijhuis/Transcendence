// React
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";
import { useSocket } from "../../../contexts/SocketContext";

// User
import { useUser } from "../../../contexts/UserContext";

// Proxies
import {
    sendFriendRequest,
    removeFriend,
    getIsFriend,
    isRequested,
    removeFriendRequest
} from "../../../proxies/friend";

// Types
import * as Profile from "../../../types/Profile";

// Utils
import randomNum from "../../../utils/numbers/randomIntFromRange";

// UI
import Button from "../../Button";
import Heading from "../../Heading";

// Styling
import { Container, ProfileStatusDisplay } from "./ProfileActions.style";

////////////////////////////////////////////////////////////

const ProfileActivityStatus = ({
    profile
}: {
    profile: Profile.Instance;
}): JSX.Element => {
    const [watchId, setWatchId] = useState<string>("");
    // const { user } = useUser();
    const { eventConnection } = useSocket();

    let activityElement: ReactElement = <></>;

    useEffect(() => {
        if (!eventConnection) return;

        eventConnection.on("memberStatus", (res) => {
            if (res.status) {
                setWatchId(res.gameId);
            }
        });
        eventConnection.emit("getStatus", profile.uid);
        return () => {
            eventConnection.removeListener("memberStatus");
        };
    }, []);

    ////////////////////////////////////////////////////////

    const rand = randomNum(0, 2);

    if (rand === 0) {
        activityElement = <span className="offline">Offline</span>;
    } else if (rand === 1) {
        activityElement = <span className="online">Online</span>;
    } else if (rand === 2) {
        activityElement = <span className="playing">Playing</span>;
    }

    ////////////////////////////////////////////////////////

    return (
        <ProfileStatusDisplay activity={rand}>
            <div>{activityElement}</div>
            {watchId ? (
                <Link to={`/watch/${watchId}`} state={{ watchId }}>
                    Watch game
                </Link>
            ) : null}
        </ProfileStatusDisplay>
    );
};

interface IProfileActions {
    profile: Profile.Instance;
}

const ProfileActions = ({ profile }: IProfileActions): JSX.Element => {
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [requestedFriendship, setRequestedFriendship] =
        useState<boolean>(false);
    const [requestButtonText, setRequestButtonText] =
        useState<string>("Add friend");

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    const toggleFriendship = async () => {
        const username = user.username;
        const friendname = profile.username;

        try {
            if (isFriend) {
                await removeFriend(username, friendname);
                setIsFriend(false);
                setRequestButtonText("Add friend");
            } else if (!isFriend && !requestedFriendship) {
                await sendFriendRequest(username, friendname);
                setRequestButtonText("Friendship requested");
            } else if (!isFriend && requestedFriendship) {
                await removeFriendRequest(username, friendname);
                setRequestButtonText("Remove friendship request");
            }
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////

    useEffect(() => {
        const getFriendStatus = async () => {
            const friendname = profile.username;

            try {
                const isFriend = await getIsFriend(friendname);
                setIsFriend(isFriend);

                if (isFriend) {
                    setRequestButtonText("Remove friend");
                    return;
                }

                const friendRequestStatus = await isRequested(friendname);

                if (friendRequestStatus === true) {
                    setRequestedFriendship(true);
                    setRequestButtonText("Remove friend request");
                }
            } catch (err) {
                console.error(err);
            }
        };
        getFriendStatus();
    }, []);

    ////////////////////////////////////////////////////////

    return (
        <Container isFriend={isFriend}>
            <Button theme="dark" onClick={() => toggleFriendship()}>
                {requestButtonText}
            </Button>
            <div className="status">
                <div className="header">
                    <Heading type={3}>Status</Heading>
                </div>
                <ProfileActivityStatus profile={profile} />
            </div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default ProfileActions;
