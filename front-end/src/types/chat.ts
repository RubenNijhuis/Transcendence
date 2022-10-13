import { GameType } from "./game";
import { ProfileID, ProfileType } from "./profile";

const enum MessageContentType {
    Simple,
    Picture,
    InvitePlay
}

// General type
type MessageTypes = SimpleMessage | PictureMessage | InvitePlayMessage;

// How we define a simple message
interface SimpleMessage {
    content: string;
}

// How we define a picture message
interface PictureMessage {
    url: string;
    alt: string;
}

// Game invite
interface InvitePlayMessage {
    opponent: ProfileType;
    user: ProfileType;
    game_type: GameType;
    accepted: boolean;
}

// Message interface
interface Message {
    content: MessageTypes;
    content_type: MessageContentType;
    timestamp: string;
    senderID: ProfileID;
    sender: ProfileType;
    uid: number;
    group_id: number;
    read_by: ProfileType[];
}

interface GroupChat {
    group_id: number;
    members: ProfileType[];
    messages: Message[];
    internal_id: number;
}

export type {
    PictureMessage,
    InvitePlayMessage,
    SimpleMessage,
    Message,
    MessageTypes,
    GroupChat
};

export { MessageContentType };
