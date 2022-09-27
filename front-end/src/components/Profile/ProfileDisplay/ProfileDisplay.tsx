// UI
import Heading from "../../Heading";
import Asset from "../../Asset";

// Crowns
import GoldCrown from "../../../assets/accesoires/gold-crown.svg";
import SilverCrown from "../../../assets/accesoires/silver-crown.svg";
import BronzeCrown from "../../../assets/accesoires/bronze-crown.svg";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { ProfileType } from "../../../types/profile";

interface Props {
    user: ProfileType;
}

const RankDisplay = ({ rank }: { rank: number }) => {
    let src: any = GoldCrown;

    if (rank === 1) src = GoldCrown;
    else if (rank === 2) src = SilverCrown;
    else if (rank === 3) src = BronzeCrown;

    return <img src={src} alt="crown" className="crown" />;
};

const ProfileDisplay = ({ user }: Props) => (
    <Container>
        <div className="banner">
            <Asset url={user.banner_url} alt="banner" />
        </div>
        <div className="profile">
            {user.rank < 4 && <RankDisplay rank={user.rank} />}
            <Asset url={user.img_url} alt="profile" />
            <Heading type={4}>{user.username}</Heading>
        </div>
    </Container>
);

export default ProfileDisplay;
