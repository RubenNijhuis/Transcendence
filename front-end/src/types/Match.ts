import * as Profile from "./Profile";

////////////////////////////////////////////////////////////

export type ID = string;

export enum Status {
    Queue,
    NoMatch,
    Matched,
    Setup,
    Playing,
    Finished
}

export enum GameType {
    Classic,
    Powered
}

export enum ScoreType {
    Friendly,
    Ranked
}

export interface ELO {
    player1: number;
    player2: number;
}

export interface PlayerProfile {
    uid: Profile.ID;
    username: string;
    elo: number;
}

export interface Request {
    profile: PlayerProfile;
    gameType: GameType;
    scoreType: ScoreType;
}

export interface Record {
    id: ID;

    playerOne: Profile.Instance;
    playerTwo: Profile.Instance;

    scoreOne: number;
    scoreTwo: number;
}
