// Just for semantics
type ProfileID = number;

// Global profile interface
interface ProfileType {
    username: string;
    img_url: string;
    banner_url: string;
    color: string;
    rank: number;
    wins: number;
    losses: number;
    friends: ProfileID[];
    blocked: ProfileID[];
}

export type { ProfileType, ProfileID };
