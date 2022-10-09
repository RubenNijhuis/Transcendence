// Just for semantics
type ProfileID = number;

// Global profile interface
interface ProfileType {
    uid: ProfileID;
    username: string;
    img_url: string;
    banner_url: string;
    color: string;
    rank: number;
    wins: number;
    losses: number;
    friends: ProfileType[];
    blocked: ProfileType[];
}

export type { ProfileType, ProfileID };
