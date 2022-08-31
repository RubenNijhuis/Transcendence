import {
    Profile,
    MatchRecord,
    Message,
    PictureMessage,
    GroupChat,
    SimpleMessage,
    InvitePlayMessage,
    GameType,
    MessageContentType
} from "./GlobalTypes";

import randomIntFromInterval from "./randomNumFromInterval";

const names = [
    "RelaxZest",
    "FreeMax",
    "Darity",
    "Gametros",
    "Softpany",
    "Attabra",
    "Sysgatic",
    "BaseReader",
    "Doodlent",
    "Darket",
    "CartBox",
    "Issuetaga",
    "BauerLou",
    "PureRelax",
    "Combedvil",
    "Darthly",
    "PurpleCooled",
    "Downholo",
    "WordsWolfie",
    "Bulletingici",
    "Celloeba",
    "Lovesag",
    "SoccerScan",
    "Soeshe",
    "Ovankeda",
    "WackyWolfie",
    "InloveMans",
    "Propobl",
    "Quarris",
    "Rocketic",
    "RapFalls",
    "DarkFarer",
    "Ninjayees",
    "Chooseis",
    "BoardinCorny",
    "Apolstra",
    "Olefina",
    "Corence",
    "SportsAholic",
    "Roserv",
    "Softects",
    "Cominast",
    "Morapern",
    "Tinsen",
    "StandDown         ",
    "Relaxerca",
    "TownWin",
    "Azlantaph",
    "MinyKissez",
    "Lydiati",
    "Cornyhe",
    "Fallsen",
    "Phannato",
    "Fantasticov",
    "Broadcasteth",
    "Vintagene",
    "Ditrope",
    "Velosia",
    "Burbobdt",
    "Toughpetr"
];

const generateProfile = (amount: number): Profile[] => {
    const profileList: Profile[] = [];

    for (let i = 0; i < amount; i++) {
        const username: string =
            names[randomIntFromInterval(0, names.length - 1)];
        const email: string = `${username}@outlook.com`;
        const uid: number = i + 1;
        const rank: number = i + 1;

        const randomWidth: number =
            Math.ceil(randomIntFromInterval(100, 1000) / 100) * 100;
        const randomHeight: number =
            Math.ceil(randomIntFromInterval(100, 1000) / 100) * 100;

        const randomWidthBanner: number =
            Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;
        const randomHeightBanner: number =
            Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;

        const img_url: string = `https://source.unsplash.com/random/${randomWidth}x${randomHeight}`;
        const banner_url: string = `https://source.unsplash.com/random/${randomWidthBanner}x${randomHeightBanner}`;

        const wins: number = randomIntFromInterval(1, 100);
        const losses: number = randomIntFromInterval(1, 100);

        const newProfile: Profile = {
            username,
            email,
            id: uid,
            banner_url,
            uid,
            color: "#1e1e1e",
            rank,
            img_url,
            wins,
            losses,
            friends: [],
            blocked: []
        };

        profileList.push(newProfile);
    }

    return profileList;
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

const generateInvite = (
    user: Profile,
    opponent: Profile
): InvitePlayMessage => {
    const invite: InvitePlayMessage = {
        opponent,
        user,
        game_type: GameType.Classic,
        accepted: false
    };

    invite.user = user;
    invite.opponent = opponent;
    invite.accepted = false;
    return invite;
};

const generateNewMessageContent = (
    sender: Profile,
    receiver: Profile,
    type: MessageContentType
): SimpleMessage | PictureMessage | InvitePlayMessage => {
    let messageContent: SimpleMessage | PictureMessage | InvitePlayMessage;

    const rand = randomIntFromInterval(0, 1);

    if (type === MessageContentType.Simple) {
        messageContent = {
            content: rand === 0 ? "BEEP" : "BOOP"
        };
    } else if (type === MessageContentType.Picture) {
        messageContent = {
            url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.surfnetkids.com%2Fgo%2Fwp-content%2Fuploads%2F2014%2F08%2Fbigstock-Koala-at-Lone-Pine-Koala-Sanct-118337648.jpg&f=1&nofb=1",
            alt: "idk man"
        };
    } else if (type === MessageContentType.InvitePlay) {
        messageContent = {
            opponent: receiver,
            user: sender,
            game_type: GameType.Classic,
            accepted: false
        };
    } else {
        messageContent = {
            content: rand === 0 ? "BEEP" : "BOOP"
        };
    }

    return messageContent;
};

const generateMessage = (
    sender: Profile,
    receiver: Profile,
    group_id: number,
    amount: number
): Message[] => {
    const messages: Message[] = [];

    for (let i = 0; i < amount; i++) {
        const rand: number = randomIntFromInterval(0, 2);

        const newMessage: Message = {
            content: generateNewMessageContent(sender, receiver, rand),
            content_type: rand,
            timestamp: new Date().toString(),
            sender,
            id: i,
            group_id,
            read_by: []
        };

        messages.push(newMessage);
    }

    return messages;
};

const generateGroupChats = (
    user: Profile,
    amount: number,
    amount_people: number
): GroupChat[] => {
    const groupChatList: GroupChat[] = [];
    const profiles: Profile[] = generateProfile(amount * amount_people);

    for (let i = 0; i < amount; i++) {
        const newGroup: GroupChat = {
            id: i,
            members: [],
            messages: []
        };

        newGroup.members.push(profiles[i]);
        newGroup.members.push(user);

        newGroup.messages.push(
            ...generateMessage(
                profiles[i],
                user,
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                user,
                profiles[i],
                i,
                randomIntFromInterval(2, 3)
            )
        );

        newGroup.messages.push(
            ...generateMessage(
                profiles[i],
                user,
                i,
                randomIntFromInterval(2, 3)
            )
        );
        groupChatList.push(newGroup);
    }
    console.log(groupChatList);
    return groupChatList;
};

export { generateProfile, generateGameResult, generateGroupChats };
