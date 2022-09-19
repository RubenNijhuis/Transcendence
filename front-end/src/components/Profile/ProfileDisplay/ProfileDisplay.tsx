// Components
import Heading from "../../Heading";

import GoldCrown from "../../../assets/icons/gold-crown.svg";
import SilverCrown from "../../../assets/icons/silver-crown.svg";
import BronzeCrown from "../../../assets/icons/bronze-crown.svg";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { Profile } from "../../../types/GlobalTypes";
import Asset from "../../Asset";

interface Props {
    user: Profile;
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
