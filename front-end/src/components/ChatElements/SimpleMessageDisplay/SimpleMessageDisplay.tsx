// Types
import { Chat } from "../../../types";

// Styling
import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

////////////////////////////////////////////////////////////

interface ISimpleMessageDisplay {
    message: Chat.Message.Instance;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: column;

    align-items: ${({ fromUser }) => (fromUser ? `end` : `start`)};

    .content {
        min-width: 50%;
        background-color: ${mainColor};
        padding: calc(${magicNum} / 8) calc(${magicNum} / 4);
        border-radius: ${smallRadius};
        color: ${lightTextColor};
    }
`;

const SimpleMessageDisplay = ({
    fromUser,
    message
}: ISimpleMessageDisplay): JSX.Element => {
    const formattedContent: Chat.Message.SimpleMessage =
        message.content as Chat.Message.SimpleMessage;

    return (
        <Container fromUser={fromUser}>
            <div className="content">{formattedContent.content}</div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default SimpleMessageDisplay;
