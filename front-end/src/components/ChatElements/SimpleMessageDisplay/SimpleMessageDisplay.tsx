// Types
import { SimpleMessage, Message } from "../../../types/chat";

// Styling
import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";
import SenderAnnotation from "../SenderAnnotation";

interface Props {
    message: Message;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: column;

    gap: calc(${magicNum} / 8);

    align-items: ${({ fromUser }) => (fromUser ? `end` : `start`)};

    .content {
        background: ${mainColor};
        padding: 9px 18px;
        border-radius: ${smallRadius};
        color: ${lightTextColor};
        text-align: ${({ fromUser }) => (fromUser ? `right` : `left`)};
    }
`;

const SimpleMessageDisplay = ({ fromUser, message }: Props) => {
    const formattedContent: SimpleMessage = message.content as SimpleMessage;

    return (
        <Container fromUser={fromUser}>
            <div className="content">{formattedContent.content}</div>
            <SenderAnnotation sender={message.sender} />
        </Container>
    );
};

export default SimpleMessageDisplay;
