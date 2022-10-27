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

interface Props {
    profile: ProfileType;
    matchHistory: MatchRecord[];
}

const ProfileDisplay = ({ profile, matchHistory }: Props): JSX.Element => {
    const { banner_url, rank, img_url, username } = profile;

    return (
        <Container>
            <Asset url={banner_url} alt="banner" className="banner" />
            <div className="profile">
                {rank < 4 && <Crown rank={rank} />}
                <Asset url={img_url} alt="profile" className="profile__img" />
                <Heading type={4}>{username}</Heading>
            </div>
            <ProfileStats player={profile} matches={matchHistory} />
        </Container>
    );
};
export default ProfileDisplay;
