// Types
import { ProfileType } from "../../types/profile";

// UI
import Asset from "../Asset";

// Styled components
import styled from "styled-components";

// Styling vars
import { magicNum, mainColor } from "../../styles/StylingConstants";
import { useAuth } from "../../contexts/AuthContext";
import { useUser } from "../../contexts/UserContext";

////////////////////////////////////////////////////////////

// TODO: in styling file
const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: ${({ fromUser }) => (fromUser ? `end` : `start`)};
    align-items: center;

    gap: calc(${magicNum} / 8);
    padding-left: calc(${magicNum} / 16);

    .img {
        border-radius: 4px;
        overflow: hidden;

        border: solid 2px ${mainColor};

        max-height: calc(${magicNum} / 2);
        max-width: calc(${magicNum} / 2);
        min-height: calc(${magicNum} / 2);
        min-width: calc(${magicNum} / 2);
        width: calc(${magicNum} / 2);
        height: calc(${magicNum} / 2);
    }
`;

interface Props {
    sender: ProfileType;
}

const SenderAnnotation = ({ sender }: Props): JSX.Element => {
    const { user } = useUser();

    ////////////////////////////////////////////////////////////

    return (
        <Container fromUser={sender.uid === user.uid}>
            <Asset
                url={sender.img_url}
                alt={`${sender.username}`}
                className="img"
            />
            <span>{sender.username}</span>
        </Container>
    );
};

export default SenderAnnotation;
