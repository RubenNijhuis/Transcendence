import Profile from "./profile";

///////////////////////////////////////////////////////////

namespace Game {
    export type MatchRecordID = string;

    export type Position = {
        posX: number;
        posY: number;
    };

    export enum ScoreType {
        Friendly,
        Ranked
    }

    export enum GameType {
        Classic,
        Powered
    }

    export interface ELO {
        player1: number;
        player2: number;
    }

    export interface Score {
        player1: number;
        player2: number;
    }

    export interface MatchRecord {
        uid: MatchRecordID;

        player1: Profile.Instance;
        player2: Profile.Instance;

        scoreType: ScoreType;
        gameType: GameType;

        elo: ELO;
        score: Score;
    }
}

///////////////////////////////////////////////////////////

export default Game;
