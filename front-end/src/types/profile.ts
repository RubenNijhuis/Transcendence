// Just for semantics
type ProfileID = number;

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
}

export type { ProfileType, ProfileID };
