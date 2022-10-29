// React
import { ReactElement, useEffect, useState } from "react";

// User
import { useUser } from "../../../contexts/UserContext";

// Proxies
import { addFriend, removeFriend, getIsFriend } from "../../../proxies/friend";

// Types
import { ProfileType } from "../../../types/profile";

// Utils
import randomNum from "../../../utils/randomNum";

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
    profile: ProfileType;
}

const ProfileActions = ({ profile }: IProfileActions): JSX.Element => {
    const [isFriend, setIsFriend] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    const toggleFriendship = async () => {
        const username = user.username;
        const friendname = profile.username;

        try {
            console.log(username, friendname);
            if (isFriend) {
                const removeResp = await removeFriend(username, friendname);
                console.log(removeResp);
            } else {
                const addResp = await addFriend(username, friendname);
                console.log(addResp);
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
                const friendStatus = await getIsFriend(username, friendname);
                setIsFriend(friendStatus);
            } catch (err) {
                console.log(err);
            }
        };
        getFriendStatus();
    }, []);

    ////////////////////////////////////////////////////////////

    return (
        <Container isFriend={isFriend}>
            <Button theme="dark" onClick={() => toggleFriendship()}>
                {isFriend ? "Following" : "Follow"}
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
