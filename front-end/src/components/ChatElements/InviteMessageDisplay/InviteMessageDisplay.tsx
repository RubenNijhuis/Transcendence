// Types
import { InvitePlayMessage } from "../../../utils/GlobalTypes";

// Styling
import styled from "styled-components";
import {
    lightTextColor,
    mainColor,
    smallRadius
} from "../../../utils/StylingConstants";

// Components
import Button from "../../Button";

interface Props {
    content: InvitePlayMessage;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;

    justify-content: ${({ fromUser }) => (fromUser ? `end` : `start`)};
    margin-bottom: 18px;

    div {
        background-color: ${mainColor};
        min-width: 50%;
        padding: 8px 16px;
        border: 2px solid ${mainColor};
        border-radius: ${smallRadius};

        span, p {
            color: ${lightTextColor};
            margin-bottom: 9px;
        }
    }
`;

const InviteMessageDisplay = ({ fromUser, content }: Props) => (
    <Container fromUser={fromUser}>
        <div>
            <span>{content.user.username}</span>
            <p>Is inviting you to play</p>
            <Button theme="light">Play a game</Button>
        </div>
    </Container>
);

export default InviteMessageDisplay;
