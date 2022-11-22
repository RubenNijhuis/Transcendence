// Types
import Profile from "../../../types/Profile";
import Game from "../../../types/Game";

// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Random player
import { generateProfile } from "./profile";

////////////////////////////////////////////////////////////

const generateGameResult = (
    player: Profile.Instance,
    amount: number
): Game.MatchRecord[] => {
    const MatchRecordList: Game.MatchRecord[] = [];

    const opponents: Profile.Instance[] = generateProfile(amount);

    for (let i = 0; i < amount; i++) {
        const winOrLose: number = randomNum(0, 1);

        const score = {
            player1: 0,
            player2: 0,
        };

        const elo = {
            player1: 0,
            player2: 0,
        };

        const otherScore: number = randomNum(0, 4);

        if (winOrLose === 0) {
            score.player1 = 5;
            score.player2 = otherScore;
        } else {
            score.player1 = otherScore;
            score.player2 = 5;
        }

        const newMatchRecord: Game.MatchRecord = {
            uid: (0).toString(),
            player1: player,
            player2: opponents[i],
            score,
            gameType: Game.GameType.Classic,
            scoreType: Game.ScoreType.Friendly,
            elo,
        };

        MatchRecordList.push(newMatchRecord);
    }

    return MatchRecordList;
};

////////////////////////////////////////////////////////////

export { generateGameResult };
