import { ProfileID } from "./profile";

// How we define match data
interface MatchRecord {
    opponent: ProfileID;
    player: ProfileID;
    score: {
        opponent: number;
        self: number;
    };
}

// Game types
const enum GameType {
    Classic,
    Powered
}

export type { MatchRecord };
export { GameType };
