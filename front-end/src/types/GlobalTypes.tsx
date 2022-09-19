// Global profile interface
interface Profile {
    username: string;
    img_url: string;
    banner_url: string;
    color: string;
    rank: number;
    wins: number;
    losses: number;
    friends: string[];
    blocked: string[];
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

interface RequestError {
    error: any;
    type: string;
}

interface LoginConfirmResponse {
    shouldCreateUser: boolean;
    profile: null | Profile;
    authToken: string;
}

export type {
    Profile,
    MatchRecord,
    Message,
    GroupChat,
    InvitePlayMessage,
    PictureMessage,
    SimpleMessage,
    AllMessageTypes,
    RequestError,
    LoginConfirmResponse
};

export { GameType, MessageContentType };