export type ID = string;

export interface Instance {
    uid: ID;

    username: string;
    description: string;

    img_url: string;
    banner_url: string;

    color: string;

    isTfaEnabled: boolean;

    rank: number;
    wins: number;
    losses: number;
    elo: number;
}
