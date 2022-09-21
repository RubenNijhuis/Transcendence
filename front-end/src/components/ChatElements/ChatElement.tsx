// Types
import {
    InvitePlayMessage,
    Message,
    MessageContentType,
    PictureMessage,
    SimpleMessage
} from "../../types/chat";
import { ProfileType } from "../../types/profile";

// UI
import SimpleMessageDisplay from "./SimpleMessageDisplay";
import PictureMessageDisplay from "./PictureMessageDisplay";
import InviteMessageDisplay from "./InviteMessageDisplay";

interface Props {
    receiver: ProfileType;
    sender: ProfileType;
    content: Message;
}

const ChatElement = ({ receiver, sender, content }: Props) => {
    const fromUser: boolean = receiver.username === sender.username;
    const contentType: MessageContentType = content.content_type;

    /**
     * IMPORTANT: must be in the same order as the content 
     * type enum defined in groupchats type file
     * 
     * [0] SimpleMessage
     * [1] PictureMessage
     * [2] InviteMessage
     */
    const messageElements = [
        <SimpleMessageDisplay
            fromUser={fromUser}
            content={content.content as SimpleMessage}
        />,
        <PictureMessageDisplay
            fromUser={fromUser}
            content={content.content as PictureMessage}
        />,
        <InviteMessageDisplay
            fromUser={fromUser}
            content={content.content as InvitePlayMessage}
        />
    ];

    return messageElements[contentType];
};

export default ChatElement;
