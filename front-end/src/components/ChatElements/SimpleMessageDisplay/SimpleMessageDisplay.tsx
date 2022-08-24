import { SimpleMessage } from "../../../utils/GlobalTypes";

interface Props {
    content: SimpleMessage;
    fromUser: boolean;
}

const SimpleMessageDisplay = ({ fromUser, content }: Props) => (
    <div style={{ marginBottom: 10, background: "red" }}>
        <div>{content.content}</div>
    </div>
);

export default SimpleMessageDisplay;
