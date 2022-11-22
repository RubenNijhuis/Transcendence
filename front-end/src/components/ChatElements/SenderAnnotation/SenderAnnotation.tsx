// Types
import { Profile } from "../../../types";

// UI
import Asset from "../../Asset";

// User context
import { useUser } from "../../../contexts/UserContext";
import { Container } from "./SenderAnnotation.style";

////////////////////////////////////////////////////////////

interface ISenderAnnotation {
    sender: Profile.Instance;
}

const SenderAnnotation = ({ sender }: ISenderAnnotation): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    return (
        <Container fromUser={sender.uid === user.uid}>
            <Asset url={sender.img_url} alt={sender.username} className="img" />
            <span>{sender.username}</span>
        </Container>
    );
};

////////////////////////////////////////////////////////////

export default SenderAnnotation;
