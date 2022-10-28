// React
import { ReactElement, useState } from "react";

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
    const [follows, setFollow] = useState<boolean>(false);

    ////////////////////////////////////////////////////////////

    const changeFollow = (): void => {
        setFollow((prev) => !prev);
    };

    ////////////////////////////////////////////////////////////

    return (
        <Container followsProfile={follows}>
            <Button theme="dark" onClick={() => changeFollow()}>
                {follows ? "Following" : "Follow"}
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
