import { ReactElement, useState } from "react";
import { ProfileType } from "../../../types/profile";
import randomIntFromInterval from "../../../utils/randomNumFromInterval";
import Button from "../../Button";
import Heading from "../../Heading";
import { Container, UserStatusDisplay } from "./ProfileActions.style";

interface Props {
    profile: ProfileType;
}

const UserStatus = () => {
    const rand = randomIntFromInterval(0, 2);

    let activityElement: ReactElement = <></>;

    if (rand === 0) {
        activityElement = <span className="offline">Offline</span>;
    } else if (rand === 1) {
        activityElement = <span className="online">Online</span>;
    } else if (rand === 2) {
        activityElement = <span className="playing">Playing</span>;
    }

    return (
        <UserStatusDisplay activity={rand}>
            <div>{activityElement}</div>
        </UserStatusDisplay>
    );
};

const ProfileActions = ({ profile }: Props) => {
    const [follows, setFollow] = useState<boolean>(false);

    const changeFollow = () => {
        setFollow((prev) => !prev);
    };

    return (
        <Container followsProfile={follows}>
            <Button theme="dark" onClick={() => changeFollow()}>
                {follows ? "Following" : "Follow"}
            </Button>
            <div className="status">
                <div className="header">
                    <Heading type={3}>Status</Heading>
                </div>
                <UserStatus />
            </div>
        </Container>
    );
};

export default ProfileActions;
