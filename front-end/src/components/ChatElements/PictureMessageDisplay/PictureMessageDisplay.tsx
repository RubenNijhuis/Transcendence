// Types
import * as Chat from "../../../types/Chat";

// UI
import Asset from "../../Asset";

// Styling
import styled from "styled-components";
import { magicNum, smallRadius } from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////

interface IPictureMessageDisplay {
    message: Chat.Message.Instance;
    fromUser: boolean;
}

const PictureMessageDisplay = ({
    fromUser,
    message
}: IPictureMessageDisplay): JSX.Element => {
    const formattedMessage: Chat.Message.Picture =
        message.content as Chat.Message.Picture;

    ////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////

export default PictureMessageDisplay;
