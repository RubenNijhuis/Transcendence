// Global profile interface
interface Profile {
    id: number;
    uid: number;
    username: string;
    img_url: string;
    email: string;
    rank: number;
    wins: number;
    losses: number;
    friends: string;
    blocked: string;
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
enum GameType {
    Classic,
    Powered
}

// Content types
enum MessageContentType {
    SimpleMessage,
    Picture,
    InvitePlay
}

// How we define a simple message
interface SimpleMessage {
    content: string;
}

// How we define a picture message
interface Picture {
    url: string;
}

// Game invite
interface InvitePlay {
    opponent: Profile;
    user: Profile;
    game_type: GameType;
    accepted: boolean;
}

// Message interface
interface Message {
    content: SimpleMessage | Picture | InvitePlay;
    content_type: MessageContentType;
    timestamp: string;
    sender: Profile;
}

// How we define a direct message
interface DirectMessage {
    profile: Profile;
    message: Message;
}

// How we define a full chat
interface Chat {
    user: Profile;
    friend: Profile;
    messages: Message[];
}

export type { Profile, MatchRecord, DirectMessage, Chat };
