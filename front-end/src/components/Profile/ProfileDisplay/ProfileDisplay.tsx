// UI
import Heading from "../../Heading";
import Asset from "../../Asset";
import Crown from "../../Crown";
import ProfileStats from "../ProfileStats";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { ProfileType } from "../../../types/profile";
import { MatchRecord } from "../../../types/game";
import { useUser } from "../../../contexts/UserContext";
import ProfileActions from "../ProfileActions";

////////////////////////////////////////////////////////////

interface IProfileDisplay {
    profile: ProfileType;
    matchHistory: MatchRecord[];
}

const ProfileDisplay = ({
    profile,
    matchHistory
}: IProfileDisplay): JSX.Element => {
    const { banner_url, rank, img_url, username } = profile;

    ////////////////////////////////////////////////////////////

    const { user } = useUser();
    const isUser = user.id === profile.id;

    ////////////////////////////////////////////////////////////

    return (
        <Container>
            <div className="banner__container">
                <Asset url={banner_url} alt="banner" className="banner" />
                <div className="profile">
                    {rank < 4 && <Crown rank={rank} />}
                    <Asset url={img_url} alt="profile" className="img" />
                    <Heading type={4}>{username}</Heading>
                </div>
            </div>
            <ProfileStats player={profile} matches={matchHistory} />
            {!isUser && <ProfileActions profile={profile} />}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ProfileDisplay;
