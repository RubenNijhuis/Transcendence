import { idText } from "typescript";
import { Profile, MatchRecord } from "./GlobalTypes";
import randomIntFromInterval from "./randomNumFromInterval";

const names = [
    "lemonoil",
    "spritsailoperator",
    "postmeow",
    "hutelfin",
    "chilisremember",
    "jibcranium",
    "homesickgolfing",
    "agocool",
    "shadydrove",
    "haltingshotput",
    "cloisteredpetulant",
    "drownebay",
    "belchregister",
    "subalternnutritious",
    "seahorsesombrero",
    "mansionhorseman",
    "gravelabour",
    "amendbutterfly",
    "doteclamour",
    "caponnonce",
    "liarlittle",
    "oryxfive",
    "weatherlycardamom",
    "livelyflakjacket",
    "admirablenoted",
    "seemlyfervent"
];

const generateProfile = (amount: number): Profile[] => {
    const profileList: Profile[] = [];

    for (let i = 0; i < amount; i++) {
        const username: string = names[randomIntFromInterval(0, names.length - 1)];
        const email: string = `${username}@outlook.com`;
        const uid: number = i + 1;
        const rank: number = i + 1;

        const randomWidth: number = Math.ceil(randomIntFromInterval(100, 1000)/100)*100;
        const randomHeight: number = Math.ceil(randomIntFromInterval(100, 1000)/100)*100;
        const img_url: string = `https://picsum.photos/${randomWidth}/${randomHeight}`;

        const wins: number = randomIntFromInterval(1, 100);
        const losses: number = randomIntFromInterval(1, 100);

        const newProfile: Profile = {
            username,
            email,
            id: uid,
            uid,
            rank,
            img_url,
            wins,
            losses,
            friends: "",
            blocked: "",
        };

        profileList.push(newProfile);
    }

    return profileList
};

const generateGameResult = (player: Profile, amount: number): MatchRecord[] => {
    const matchRecordList: MatchRecord[] = [];

    const opponents: Profile[] = generateProfile(amount);

    for (let i = 0; i < amount; i++) {

        const winOrLose: number = randomIntFromInterval(0, 1);

        let score = {
            opponent: 0,
            self: 0
        };

        const otherScore: number = randomIntFromInterval(0, 4)

        if (winOrLose === 0) {
            score.opponent = 5;
            score.self = otherScore
        }
        else {
            score.opponent = otherScore;
            score.self = 5;
        }
        
        const newMatchRecord: MatchRecord = {
            player,
            opponent: opponents[i],
            score
        }

        matchRecordList.push(newMatchRecord);
    }

    return matchRecordList;
}

export { generateProfile, generateGameResult };
