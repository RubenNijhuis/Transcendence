import { GameType } from "./game";
import { Profile } from "./profile";

const enum MessageContentType {
    Simple,
    Picture,
    InvitePlay
}

// General type
type AllMessageTypes = SimpleMessage | PictureMessage | InvitePlayMessage;

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
    opponent: Profile;
    user: Profile;
    game_type: GameType;
    accepted: boolean;
}

// Message interface
interface Message {
    content: AllMessageTypes;
    content_type: MessageContentType;
    timestamp: string;
    sender: Profile;
    id: number;
    group_id: number;
    read_by: Profile[];
}

interface GroupChat {
    group_id: number;
    members: Profile[];
    messages: Message[];
}

export type {
    PictureMessage,
    InvitePlayMessage,
    SimpleMessage,
    Message,
    AllMessageTypes,
    GroupChat,
};

export { MessageContentType };
