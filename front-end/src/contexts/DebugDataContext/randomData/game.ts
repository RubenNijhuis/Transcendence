import { MatchRecord, Profile } from "../../../types/GlobalTypes";
import randomIntFromInterval from "../../../utils/randomNumFromInterval";
import { generateProfile } from "./profile";

const generateGameResult = (player: Profile, amount: number): MatchRecord[] => {
    const matchRecordList: MatchRecord[] = [];

    const opponents: Profile[] = generateProfile(amount);

    for (let i = 0; i < amount; i++) {
        const winOrLose: number = randomIntFromInterval(0, 1);

        let score = {
            opponent: 0,
            self: 0
        };

        const otherScore: number = randomIntFromInterval(0, 4);

        if (winOrLose === 0) {
            score.opponent = 5;
            score.self = otherScore;
        } else {
            score.opponent = otherScore;
            score.self = 5;
        }

        const newMatchRecord: MatchRecord = {
            player,
            opponent: opponents[i],
            score
        };

        matchRecordList.push(newMatchRecord);
    }

    return matchRecordList;
};

export { generateGameResult };
