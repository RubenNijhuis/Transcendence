// Components
import Heading from "../Heading";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { Profile } from "../../utils/GlobalTypes";
import Asset from "../Asset";

interface Props {
    user: Profile;
}

const ProfileDisplay = ({ user }: Props) => (
    <Container>
        <div className="banner">
            <Asset url={user.banner_url} alt="banner" />
        </div>
        <div className="profile">
            <Asset url={user.img_url} alt="profile" />
            <Heading type={4}>{user.username}</Heading>
        </div>
    </Container>
);

export default ProfileDisplay;
