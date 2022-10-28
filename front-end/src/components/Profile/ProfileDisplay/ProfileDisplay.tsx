// UI
import Heading from "../../Heading";
import Asset from "../../Asset";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { ProfileType } from "../../../types/profile";
import Crown from "../../Crown";
import ProfileStats from "../ProfileStats";
import { MatchRecord } from "../../../types/game";

////////////////////////////////////////////////////////////

interface IProfileDisplay {
    profile: ProfileType;
    matchHistory: MatchRecord[];
}

const ProfileDisplay = ({ profile, matchHistory }: IProfileDisplay): JSX.Element => {
    const { banner_url, rank, img_url, username } = profile;

    return (
        <Container>
            <div className="banner__container">
                <Asset url={banner_url} alt="banner" className="banner" />
                <div className="profile">
                    {rank < 4 && <Crown rank={rank} />}
                    <Asset
                        url={img_url}
                        alt="profile"
                        className="img"
                    />
                    <Heading type={4}>{username}</Heading>
                </div>
            </div>
            <ProfileStats player={profile} matches={matchHistory} />
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ProfileDisplay;
