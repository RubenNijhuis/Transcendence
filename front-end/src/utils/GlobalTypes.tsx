// Global profile interface
interface Profile {
    intraID: number;
    username: string;
    img_url: string;
    banner_url: string;
    color: string;
    rank: number;
    wins: number;
    losses: number;
    friends: Profile[];
    blocked: Profile[];
}

// How we define match data
interface MatchRecord {
    opponent: Profile;
    player: Profile;
    score: {
        opponent: number;
        self: number;
    };
}

// Game types
const enum GameType {
    Classic,
    Powered
}

// Content types
const enum MessageContentType {
    Simple,
    Picture,
    InvitePlay
}

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
    Profile,
    MatchRecord,
    Message,
    GroupChat,
    InvitePlayMessage,
    PictureMessage,
    SimpleMessage,
    AllMessageTypes
};

export { GameType, MessageContentType };
