import PageRoutes from "../../config/PageRoutes";

export const locations = [
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
    },
    {
        name: "Settings",
        url: PageRoutes.settings,
        onlyWhenLoggedin: true
    }
];
