import { InvitePlayMessage } from "../../../utils/GlobalTypes";
import styled from "styled-components";
import { mainColor, smallRadius } from "../../../utils/StylingConstants";
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
        border: 2px solid ${mainColor};
        padding: 8px 16px;
        border-radius: ${smallRadius};

        p {
            margin-bottom: 9px;
        }
    }
`;

const InviteMessageDisplay = ({ fromUser, content }: Props) => (
    <Container fromUser={fromUser}>
        <div>
            <span>{content.opponent.username}</span>
            <p>Is inviting you to play</p>
            <Button>Play a game</Button>
        </div>
    </Container>
);

export default InviteMessageDisplay;
