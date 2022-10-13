// Types
import { PictureMessage, Message } from "../../../types/chat";

// UI
import Asset from "../../Asset";

// Styling
import styled from "styled-components";
import { magicNum, smallRadius } from "../../../styles/StylingConstants";

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: column;

    align-items: ${({ fromUser }) => (fromUser ? `end` : `start`)};

    .picture {
        border: solid 2px black;
        border-radius: ${smallRadius};
        overflow: hidden;
        width: 50%;
        max-width: 50%;
        height: calc(${magicNum} * 4);
    }
`;

interface Props {
    message: Message;
    fromUser: boolean;
}

const PictureMessageDisplay = ({ fromUser, message }: Props): JSX.Element => {
    const formattedMessage: PictureMessage = message.content as PictureMessage;

    return (
        <Container fromUser={fromUser}>
            <Asset
                url={formattedMessage.url}
                alt={formattedMessage.alt}
                className="picture"
            />
        </Container>
    );
};

export default PictureMessageDisplay;
