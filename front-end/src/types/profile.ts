// Just for semantics
type ProfileID = string;

// Global profile interface
interface ProfileType {
    uid: ProfileID;

    username: string;

    img_url: string;
    banner_url: string;

    color: string;

    isTfaEnabled?: boolean;

    rank: number;
    wins: number;
    losses: number;
}

export type { ProfileType, ProfileID };
