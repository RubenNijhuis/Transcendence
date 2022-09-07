import { Profile } from "../GlobalTypes";
import randomIntFromInterval from "../randomNumFromInterval";

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
        const intraID: number = i + 1;
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
            intraID,
            username,
            banner_url,
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

export { generateProfile };
