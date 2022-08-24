import { PictureMessage } from "../../../utils/GlobalTypes";
import styled from "styled-components";
import Asset from "../../Asset";
import { smallRadius } from "../../../utils/StylingConstants";

interface Props {
    content: PictureMessage;
    fromUser: boolean;
}

const Container = styled.div<{ fromUser: boolean }>`
    display: flex;

    justify-content: ${({ fromUser }) => (fromUser ? `end` : `start`)};
    margin-bottom: 18px;

    .asset {
        border: solid 2px black;
        border-radius: ${smallRadius};
        overflow: hidden;
        width: 50%;
        max-width: 50%;
        height: 300px;
    }
`;

const PictureMessageDisplay = ({ fromUser, content }: Props) => (
    <Container fromUser={fromUser}>
        <Asset url={content.url} alt={content.alt} />
    </Container>
);

export default PictureMessageDisplay;
