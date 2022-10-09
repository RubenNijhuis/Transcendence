// Types
import { InvitePlayMessage, Message } from "../../../types/chat";

// Styling
import styled from "styled-components";
import {
    lightTextColor,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

// UI
import Button from "../../Button";

interface Props {
    message: Message;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: column;

    align-items: ${({ fromUser }) => (fromUser ? `end` : `start`)};
    margin-bottom: 18px;

    div {
        background-color: ${mainColor};
        min-width: 50%;
        max-width: 50%;
        padding: 8px 16px;
        border: 2px solid ${mainColor};
        border-radius: ${smallRadius};

        span,
        p {
            color: ${lightTextColor};
            margin-bottom: 9px;
        }
    }
`;

const InviteMessageDisplay = ({ fromUser, message }: Props) => {
    const formattedContent: InvitePlayMessage =
        message.content as InvitePlayMessage;

    return (
        <Container fromUser={fromUser}>
            <div>
                <span>{formattedContent.user.username}</span>
                <p>Is inviting you to play</p>
                <Button theme="light">Play a game</Button>
            </div>
            <span>{message.sender?.username}</span>
        </Container>
    );
};

export default InviteMessageDisplay;
