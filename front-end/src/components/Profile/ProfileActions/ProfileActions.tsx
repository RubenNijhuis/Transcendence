// React
import { ReactElement, useEffect, useState } from "react";

// User
import { useUser } from "../../../contexts/UserContext";

// Proxies
import {
    sendFriendRequest,
    removeFriend,
    getIsFriend,
    isRequested,
    removeFriendRequest,
} from "../../../proxies/friend";

// Types
import { Profile } from "../../../types";

// Utils
import randomNum from "../../../utils/numbers/randomIntFromRange";

// UI
import Button from "../../Button";
import Heading from "../../Heading";

// Styling
import { Container, ProfileStatusDisplay } from "./ProfileActions.style";

////////////////////////////////////////////////////////////

const ProfileActivityStatus = (): JSX.Element => {
    let activityElement: ReactElement = <></>;

    ////////////////////////////////////////////////////////////

    const rand = randomNum(0, 2);

    if (rand === 0) {
        activityElement = <span className="offline">Offline</span>;
    } else if (rand === 1) {
        activityElement = <span className="online">Online</span>;
    } else if (rand === 2) {
        activityElement = <span className="playing">Playing</span>;
    }

    ////////////////////////////////////////////////////////////

    return (
        <ProfileStatusDisplay activity={rand}>
            <div>{activityElement}</div>
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

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const toggleFriendship = async () => {
        const username = user.username;
        const friendname = profile.username;

        try {
            if (isFriend) {
                await removeFriend(username, friendname);
                setIsFriend(false);
                setRequestButtonText("Add friend");
            } else {
                if (requestedFriendship === true) {
                    setRequestButtonText("Remove friendship request");
                    await removeFriendRequest(username, friendname);
                }
                await sendFriendRequest(username, friendname);
                setRequestButtonText("Friendship requested");
                setIsFriend(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    ////////////////////////////////////////////////////////////

    useEffect(() => {
        const getFriendStatus = async () => {
            const username = user.username;
            const friendname = profile.username;

            try {
                const isFriend = await getIsFriend(username, friendname);
                setIsFriend(isFriend);

                if (isFriend === true) {
                    setRequestButtonText("Remove friend");
                    return;
                }

                const friendRequestStatus = await isRequested(
                    username,
                    friendname
                );

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

    ////////////////////////////////////////////////////////////

    return (
        <Container isFriend={isFriend}>
            <Button theme="dark" onClick={() => toggleFriendship()}>
                {requestButtonText}
            </Button>
            <div className="status">
                <div className="header">
                    <Heading type={3}>Status</Heading>
                </div>
                <ProfileActivityStatus />
            </div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default ProfileActions;
