import PageRoutes from "../../config/PageRoutes";

////////////////////////////////////////////////////////////

interface NavLink {
    name: string;
    url: string;
    onlyWhenLoggedIn: boolean;
}

const locations: NavLink[] = [
    {
        name: "Chat",
        url: PageRoutes.chat,
        onlyWhenLoggedIn: true
    },
    {
        name: "Pong",
        url: PageRoutes.pong,
        onlyWhenLoggedIn: false
    },
    {
        name: "Leaderboard",
        url: PageRoutes.leaderBoard,
        onlyWhenLoggedIn: true
    },
    {
        name: "Profile",
        url: PageRoutes.profile,
        onlyWhenLoggedIn: true
    }
];

////////////////////////////////////////////////////////////

export type { NavLink };

export { locations };
