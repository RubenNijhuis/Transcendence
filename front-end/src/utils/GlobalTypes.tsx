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


export type { Profile, MatchRecord };
