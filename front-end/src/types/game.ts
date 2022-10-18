import { ProfileType } from "./profile";

// Score type
const enum ScoreType {
    Friendly,
    Ranked
}

// Game types
const enum GameType {
    Classic,
    Powered
}

// How we define match data
interface MatchRecord {
    id: number;

    player1: ProfileType;
    player2: ProfileType;

    score_type: ScoreType;
    game_type: GameType;

    elo: {
        player1: number;
        player2: number;
    } | null;

    score: {
        player1: number;
        player2: number;
    };
}

export type { MatchRecord };
export { GameType, ScoreType };
