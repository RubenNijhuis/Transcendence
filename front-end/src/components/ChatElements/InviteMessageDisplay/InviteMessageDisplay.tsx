// Types
import { InvitePlayMessage, Message } from "../../../types/chat";

// Styling
import styled from "styled-components";
import {
    lightTextColor,
    magicNum,
    mainColor,
    smallRadius
} from "../../../styles/StylingConstants";

// UI
import Button from "../../Button";

////////////////////////////////////////////////////////////

interface Props {
    message: Message;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ fromUser }) => (fromUser ? `end` : `start`)};

    .content {
        background-color: ${mainColor};
        min-width: 50%;
        max-width: 50%;
        padding: calc(${magicNum} / 8) calc(${magicNum} / 4);
        border: 2px solid ${mainColor};
        border-radius: ${smallRadius};

        span,
        p {
            color: ${lightTextColor};
            margin-bottom: calc(${magicNum} / 8);
        }
    }
`;

const InviteMessageDisplay = ({ fromUser, message }: Props): JSX.Element => {
    const formattedContent: InvitePlayMessage =
        message.content as InvitePlayMessage;

    ////////////////////////////////////////////////////////////

    return (
        <Container fromUser={fromUser}>
            <div className="content">
                <span>{formattedContent.user.username}</span>
                <p>Is inviting you to play</p>
                <Button theme="light">Play a game</Button>
            </div>
        </Container>
    );
};

export default InviteMessageDisplay;
