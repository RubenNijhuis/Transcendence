// Types
import { MatchRecord } from "../../../types/game";
import { ProfileType } from "../../../types/profile";

// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Random player
import { generateProfile } from "./profile";

const generateGameResult = (
    player: ProfileType,
    amount: number
): MatchRecord[] => {
    const matchRecordList: MatchRecord[] = [];

    const opponents: ProfileType[] = generateProfile(amount);

    for (let i = 0; i < amount; i++) {
        const winOrLose: number = randomNum(0, 1);

        let score = {
            player1: 0,
            player2: 0
        };

        let elo = {
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

        const newMatchRecord: MatchRecord = {
            id: 0,
            player1: player,
            player2: opponents[i],
            score,
            game_type: 0,
            score_type: 0,
            elo
        };

        matchRecordList.push(newMatchRecord);
    }

    return matchRecordList;
};

export { generateGameResult };
