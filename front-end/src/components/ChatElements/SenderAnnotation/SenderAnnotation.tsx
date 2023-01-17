// Types
import * as Profile from "../../../types/Profile";

// UI
import Asset from "../../Asset";

// User context
import { useUser } from "../../../contexts/UserContext";
import { Container } from "./SenderAnnotation.style";

// Routing
import { Link } from "react-router-dom";
import PageRoutes from "../../../config/PageRoutes";

////////////////////////////////////////////////////////////

interface ISenderAnnotation {
    sender: Profile.Instance;
}

const SenderAnnotation = ({ sender }: ISenderAnnotation): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////

    return (
        <Container fromUser={sender.uid === user.uid}>
            <Link to={PageRoutes.profileWithUsername(sender.username)}>
                <Asset
                    url={sender.img_url}
                    alt={sender.username}
                    className="img"
                />
                <span>{sender.username}</span>
            </Link>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default SenderAnnotation;
