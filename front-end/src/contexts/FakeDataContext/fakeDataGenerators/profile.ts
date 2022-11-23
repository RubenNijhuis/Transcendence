// Random img
import { get_img_url } from "./utils";
// Random int
import randomNum from "../../../utils/numbers/randomIntFromRange";

// Types
import { Profile } from "../../../types";

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
    "Toughpetr",
];

const generateProfile = (amount: number): Profile.Instance[] => {
    const profileList: Profile.Instance[] = [];

    for (let i = 0; i < amount; i++) {
        const username: string = names[randomNum(0, names.length - 1)];
        const rank: number = i + 1;

        const color = "#1e1e1e";

        const randomWidth: number = Math.ceil(randomNum(100, 1000) / 100) * 100;
        const randomHeight: number =
            Math.ceil(randomNum(100, 1000) / 100) * 100;

        const randomWidthBanner: number =
            Math.ceil(randomNum(1000, 2000) / 100) * 100;
        const randomHeightBanner: number =
            Math.ceil(randomNum(1000, 2000) / 100) * 100;

        const img_url: string = get_img_url(randomWidth, randomHeight);
        const banner_url: string = get_img_url(
            randomWidthBanner,
            randomHeightBanner
        );

        const wins: number = randomNum(1, 100);
        const losses: number = randomNum(1, 100);

        const newProfile: Profile.Instance = {
            username,
            description: "Lorem ipsum sit dolor amet",
            banner_url,
            color,
            rank,
            uid: (i + 1).toString(),
            img_url,
            wins,
            losses,
        };

        profileList.push(newProfile);
    }

    return profileList;
};

///////////////////////////////////////////////////////////

export { generateProfile };
