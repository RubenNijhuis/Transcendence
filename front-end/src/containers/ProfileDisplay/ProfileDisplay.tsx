import { Profile } from "../../utils/GlobalTypes";
import { capitalizeString } from "../../utils/StringManipulation";
import Heading from "../../components/Heading";
import { Container } from "./ProfileDisplay.style";

interface Props {
    user: Profile;
}

const ProfileDisplay = ({ user }: Props) => (
    <Container>
        <Heading type={1}>{capitalizeString(user.username)}'s Profile</Heading>
        <div className="profile">
            <img src={user.img_url} alt="profile" />
            <div className="user-data">
                <Heading type={2}>{user.username}</Heading>
                <p>Joined: 2 Sept, 2022</p>
                <p>
                    Mostly plays: <b>Standard</b>
                </p>
            </div>
        </div>
    </Container>
);

export default ProfileDisplay;
