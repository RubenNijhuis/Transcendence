// Types
import {
    InvitePlayMessage,
    Message,
    MessageContentType,
    PictureMessage,
    SimpleMessage
} from "../../types/chat";

// UI
import SimpleMessageDisplay from "./SimpleMessageDisplay";
import PictureMessageDisplay from "./PictureMessageDisplay";
import InviteMessageDisplay from "./InviteMessageDisplay";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import { magicNum } from "../../styles/StylingConstants";

interface Props {
    message: Message;
    fromUser: boolean;
}

const ChatElementContainer = styled.div`
    margin-bottom: calc(${magicNum} / 2);
`;

const ChatElement = ({ fromUser, message }: Props): JSX.Element => {
    const { user } = useAuth();

    const contentType: MessageContentType = message.content_type;

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

    return (
        <ChatElementContainer>
            {messageElements[contentType]}
        </ChatElementContainer>
    );
};

export default ChatElement;
