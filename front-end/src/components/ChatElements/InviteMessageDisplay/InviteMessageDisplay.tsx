// Types
import * as Chat from "../../../types/Chat";

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
import { useUser } from "../../../contexts/UserContext";
import { Link } from "react-router-dom";

////////////////////////////////////////////////////////////

interface IInviteMessageDisplay {
    message: Chat.Message.Instance;
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

const InviteMessageDisplay = ({
    fromUser,
    message
}: IInviteMessageDisplay): JSX.Element => {
    const formattedContent: Chat.Message.GameInvite =
        message.content as Chat.Message.GameInvite;

    ////////////////////////////////////////////////////////

    const { user } = useUser();

    ////////////////////////////////////////////////////////

    return (
        <Container fromUser={fromUser}>
                <div className="content">
            <Link
                to={`/play/classic`}
                state={{ friendId: formattedContent.opponent }}
            >
                    <span>{user.username}</span>
                    <p>Is inviting you to play</p>
                    <Button theme="light">Play a game</Button>
            </Link>
                </div>
        </Container>
    );
};

///////////////////////////////////////////////////////////

export default InviteMessageDisplay;
