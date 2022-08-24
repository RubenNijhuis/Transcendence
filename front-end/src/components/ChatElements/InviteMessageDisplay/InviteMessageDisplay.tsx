import { InvitePlayMessage } from "../../../utils/GlobalTypes";

interface Props {
    content: InvitePlayMessage;
    fromUser: boolean;
}

const InviteMessageDisplay = ({fromUser, content }: Props) => (
    <div>
        <div>
            {content.opponent.username}
        </div>
        <p>Is inviting you to play</p>
    </div>
);

export default InviteMessageDisplay;
