import { Profile } from "./profile";

// How we define match data
interface MatchRecord {
    opponent: Profile;
    player: Profile;
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
