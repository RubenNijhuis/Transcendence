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

export type { Profile };
