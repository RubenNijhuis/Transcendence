import Game from "./Game";
import Profile from "./Profile";

////////////////////////////////////////////////////////////

namespace Match {
    export type ID = string;

    export enum Status {
        Queue = "Queue",
        Matched = "Matches",
        Playing = "Playing"
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
        uid: Profile.ProfileID;
        username: string;
        elo: number;
    }

    export interface Request {
        profile: PlayerProfile;
        gameType: GameType;
        scoreType: ScoreType;
    }

    export interface Record {
        uid: ID;

        player1: Profile.Instance;
        player2: Profile.Instance;

        scoreType: ScoreType;
        gameType: GameType;

        elo: ELO;
        score: Game.Score;
    }
}

////////////////////////////////////////////////////////////

export default Match;
