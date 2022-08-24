// Types
import {
    InvitePlayMessage,
    Message,
    MessageContentType,
    PictureMessage,
    Profile,
    SimpleMessage
} from "../../utils/GlobalTypes";

// Components
import SimpleMessageDisplay from "./SimpleMessageDisplay";
import PictureMessageDisplay from "./PictureMessageDisplay";
import InviteMessageDisplay from "./InviteMessageDisplay";

interface Props {
    receiver: Profile;
    content: Message;
}

const ChatElement = ({ receiver, content }: Props) => {
    const fromUser: boolean = receiver.uid === content.sender.uid;

    switch (content.content_type) {
        case MessageContentType.Simple:
            return (
                <SimpleMessageDisplay
                    fromUser={fromUser}
                    content={content.content as SimpleMessage}
                />
            );
        case MessageContentType.Picture:
            return (
                <PictureMessageDisplay
                    fromUser={fromUser}
                    content={content.content as PictureMessage}
                />
            );
        case MessageContentType.InvitePlay:
            return (
                <InviteMessageDisplay
                    fromUser={fromUser}
                    content={content.content as InvitePlayMessage}
                />
            );
    }
};

export default ChatElement;
