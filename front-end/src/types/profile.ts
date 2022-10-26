// Just for semantics
type ProfileID = string;

// Global profile interface
interface ProfileType {
    id: ProfileID;

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
