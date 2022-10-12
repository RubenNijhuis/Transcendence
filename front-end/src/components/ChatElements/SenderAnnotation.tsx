import { ProfileType } from "../../types/profile";
import Asset from "../Asset";
import styled from "styled-components";
import { magicNum, mainColor } from "../../styles/StylingConstants";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: calc(${magicNum} / 8);

    padding-left: calc(${magicNum} / 16);

    .img {
        border-radius: 2px;
        overflow: hidden;

        border: solid 2px ${mainColor};

        max-height: calc(${magicNum} / 2);
        max-width: calc(${magicNum} / 2);
        min-height: calc(${magicNum} / 2);
        min-width: calc(${magicNum} / 2);
        width: calc(${magicNum} / 2);
        height: calc(${magicNum} / 2);
    }
`;

interface Props {
    sender: ProfileType;
}

const SenderAnnotation = ({ sender }: Props) => {
    return (
        <Container>
            <Asset
                url={sender.img_url}
                alt={`${sender.username}`}
                className="img"
            />
            <span>{sender.username}</span>
        </Container>
    );
};

export default SenderAnnotation;
