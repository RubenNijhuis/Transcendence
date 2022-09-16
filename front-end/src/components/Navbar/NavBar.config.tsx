import { PageRoutes } from "../../config";

export const locations = [
    {
        name: "About",
        url: PageRoutes.about,
        onlyWhenLoggedin: false
    },
    {
        name: "Chat",
        url: PageRoutes.chat,
        onlyWhenLoggedin: true
    },
    {
        name: "PongTestPage",
        url: PageRoutes.pong,
        onlyWhenLoggedin: false
    },
    {
        name: "Leaderboard",
        url: PageRoutes.leaderBoard,
        onlyWhenLoggedin: true
    },
    {
        name: "Profile",
        url: PageRoutes.profile,
        onlyWhenLoggedin: true
    }
];
