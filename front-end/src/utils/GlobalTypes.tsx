// Global profile interface
interface Profile {
    username: string;
    email: string;
    user_id: number;
    ranking: number;
    img_url: string;
}


// How we define match data
interface MatchRecord {
    opponent: Profile;
    score: {
        opponent: number;
        self: number;
    };
}


export type { Profile, MatchRecord };
