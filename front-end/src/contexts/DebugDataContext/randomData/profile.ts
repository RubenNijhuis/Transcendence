import { get_img_url } from "./index";
import { Profile } from "../../../types/GlobalTypes";
import randomIntFromInterval from "../../../utils/randomNumFromInterval";

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
    "StandDown",
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
        const rank: number = i + 1;

        const color: string = "#1e1e1e";

        const randomWidth: number =
            Math.ceil(randomIntFromInterval(100, 1000) / 100) * 100;
        const randomHeight: number =
            Math.ceil(randomIntFromInterval(100, 1000) / 100) * 100;

        const randomWidthBanner: number =
            Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;
        const randomHeightBanner: number =
            Math.ceil(randomIntFromInterval(1000, 2000) / 100) * 100;

        const img_url: string = get_img_url(randomWidth, randomHeight);
        const banner_url: string = get_img_url(
            randomWidthBanner,
            randomHeightBanner
        );

        const wins: number = randomIntFromInterval(1, 100);
        const losses: number = randomIntFromInterval(1, 100);

        const newProfile: Profile = {
            username,
            banner_url,
            color,
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
