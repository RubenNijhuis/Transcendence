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
import Logger from "../../utils/Logger";

interface Props {
    receiver: Profile;
    sender: Profile;
    content: Message;
}

const ChatElement = ({ receiver, sender, content }: Props) => {
    const fromUser: boolean = receiver.username === sender.username;

    Logger("DEBUG", "Chat element", "From user?", {
        fromUser,
        sender: sender.username,
        receiver: receiver.username
    });

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
