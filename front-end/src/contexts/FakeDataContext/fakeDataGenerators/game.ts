// Types
import * as Profile from "../../../types/Profile";
import * as Match from "../../../types/Match";

// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Random player
import { generateProfile } from "./profile";

////////////////////////////////////////////////////////////

const generateGameResult = (
    player: Profile.Instance,
    amount: number
): Match.Record[] => {
    const MatchRecordList: Match.Record[] = [];

    const opponents: Profile.Instance[] = generateProfile(amount);

    for (let i = 0; i < amount; i++) {
        const winOrLose: number = randomNum(0, 1);

        const score = {
            player1: 0,
            player2: 0
        };

        const elo = {
            player1: 0,
            player2: 0
        };

        const otherScore: number = randomNum(0, 4);

        if (winOrLose === 0) {
            score.player1 = 5;
            score.player2 = otherScore;
        } else {
            score.player1 = otherScore;
            score.player2 = 5;
        }

        const newMatchRecord: Match.Record = {
            uid: (0).toString(),
            player1: player,
            player2: opponents[i],
            score,
            gameType: Match.GameType.Classic,
            scoreType: Match.ScoreType.Friendly,
            elo
        };

        MatchRecordList.push(newMatchRecord);
    }

    return MatchRecordList;
};

////////////////////////////////////////////////////////////

export { generateGameResult };
