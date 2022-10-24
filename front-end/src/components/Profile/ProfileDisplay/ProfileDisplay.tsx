// UI
import Heading from "../../Heading";
import Asset from "../../Asset";

// Styling
import { Container } from "./ProfileDisplay.style";

// Types
import { ProfileType } from "../../../types/profile";
import Crown from "../../Crown";

////////////////////////////////////////////////////////////

interface Props {
    user: ProfileType;
}

const ProfileDisplay = ({ user }: Props): JSX.Element => {
    const { banner_url, rank, img_url, username } = user;

    return (
        <Container>
            <Asset url={banner_url} alt="banner" className="banner" />
            <div className="profile">
                {rank < 4 && <Crown rank={rank} />}
                <Asset url={img_url} alt="profile" className="profile__img" />
                <Heading type={4}>{username}</Heading>
            </div>
        </Container>
    );
};
export default ProfileDisplay;
