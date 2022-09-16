import { PageRoutes } from "../../config";

export const InboundLinks = [
    {
        name: "Home",
        url: PageRoutes.home,
        onlyWhenLoggedin: false
    },
    {
        name: "About",
        url: PageRoutes.about,
        onlyWhenLoggedin: false
    }
];

export const GithubLink = "https://github.com/rubennijhuis/transcendence";
