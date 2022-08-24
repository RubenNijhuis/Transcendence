import { SimpleMessage } from "../../../utils/GlobalTypes";
import styled from "styled-components";
import { lightTextColor, mainColor, smallRadius } from "../../../utils/StylingConstants";

interface Props {
    content: SimpleMessage;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;

    justify-content: ${({ fromUser }) => (fromUser ? `end` : `start`)};

    div {
        margin-bottom: 18px;
        background: ${mainColor};
        padding: 9px 18px;
        border-radius: ${smallRadius};
        color: ${lightTextColor};
        text-align: ${({ fromUser }) => (fromUser ? `right` : `left`)};
    }
`;

const SimpleMessageDisplay = ({ fromUser, content }: Props) => (
    <Container fromUser={fromUser}>
        <div>{content.content}</div>
    </Container>
);

export default SimpleMessageDisplay;
