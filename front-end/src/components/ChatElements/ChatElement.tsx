// Types
import { Message, MessageContentType } from "../../types/chat";

// UI
import SimpleMessageDisplay from "./SimpleMessageDisplay";
import PictureMessageDisplay from "./PictureMessageDisplay";
import InviteMessageDisplay from "./InviteMessageDisplay";

// Auth
import { useAuth } from "../../contexts/AuthContext";

// Styling
import styled from "styled-components";

// Styling constants
import { magicNum } from "../../styles/StylingConstants";
import SenderAnnotation from "./SenderAnnotation";

// TODO: styling file
const ChatElementContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: calc(${magicNum} / 8);
    margin-bottom: calc(${magicNum} / 4);
`;

interface Props {
    message: Message;
    fromUser: boolean;
    isDm: boolean;
}

const ChatElement = ({ fromUser, message, isDm }: Props): JSX.Element => {
    const contentType: MessageContentType = message.content_type;

    ////////////////////////////////////////////////////////////

    /**
     * IMPORTANT: must be in the same order as the content
     * type enum defined in groupchats type file
     *
     * [0] SimpleMessage
     * [1] PictureMessage
     * [2] InviteMessage
     */
    const messageElements = [
        <SimpleMessageDisplay fromUser={fromUser} message={message} />,
        <PictureMessageDisplay fromUser={fromUser} message={message} />,
        <InviteMessageDisplay fromUser={fromUser} message={message} />
    ];

    ////////////////////////////////////////////////////////////

    return (
        <ChatElementContainer>
            {messageElements[contentType]}
            {!isDm && <SenderAnnotation sender={message.sender} />}
        </ChatElementContainer>
    );
};

export default ChatElement;
