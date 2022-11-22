// UI
import Heading from "../../Heading";
import Asset from "../../Asset";
import Crown from "../../Crown";

// Profile components
import ProfileStats from "../ProfileStats";
import ProfileActions from "../ProfileActions";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { Profile, Game } from "../../../types";

// User
import { useUser } from "../../../contexts/UserContext";

////////////////////////////////////////////////////////////

interface IProfileDisplay {
    profile: Profile.Instance;
    matchHistory: Game.MatchRecord[];
}

const ProfileDisplay = ({
    profile,
    matchHistory,
}: IProfileDisplay): JSX.Element => {
    const { banner_url, rank, img_url, username, description } = profile;

    ////////////////////////////////////////////////////////////

    const { user } = useUser();
    const isUser = user.uid === profile.uid;

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

            <div className="description">
                <Heading type={3}>About {username}</Heading>
                <p>{description}</p>
            </div>

            {!isUser && <ProfileActions profile={profile} />}
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default ProfileDisplay;
