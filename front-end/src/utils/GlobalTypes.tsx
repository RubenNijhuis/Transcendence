// Global profile interface
interface Profile {
    id: number;
    uid: number;
    username: string;
    img_url: string;
    banner_url: string;
    color: string;
    email: string;
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
    content: SimpleMessage | PictureMessage | InvitePlayMessage;
    content_type: MessageContentType;
    timestamp: string;
    sender: Profile;
    id: number;
    group_id: number;
    read_by: null | Profile[];
}

interface GroupChat {
    id: number;
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
    SimpleMessage
};

export { GameType, MessageContentType };
