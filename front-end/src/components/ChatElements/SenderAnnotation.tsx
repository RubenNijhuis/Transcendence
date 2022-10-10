import { ProfileType } from "../../types/profile";
import Asset from "../Asset";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
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
