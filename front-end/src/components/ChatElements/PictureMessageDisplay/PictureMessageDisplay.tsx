import { PictureMessage } from "../../../utils/GlobalTypes";

interface Props {
    content: PictureMessage;
    fromUser: boolean;
}

const PictureMessageDisplay = ({ fromUser, content }: Props) => (
    <div style={{ maxWidth: "100px" }}>
        <img style={{ maxWidth: "100%" }} src={content.url} alt={content.alt} />
    </div>
);

export default PictureMessageDisplay;
