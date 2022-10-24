/**
 * Describes all the routes the front-end can access
 */
const PageRoutes = {
    home: `/`,

    ////////////////////////////////////////////////////////////

    play: `/play`,
    pong: `/pong`,
    newPong: `/new-pong`,

    ////////////////////////////////////////////////////////////

    createAccount: `/create-account`,

    ////////////////////////////////////////////////////////////

    profile: `/profile`,
    profileWithUserName: (userName: string) => `/profile/${userName}`,
    chat: `/chat`,
    leaderBoard: `/leaderboard`,

    settings: `/settings`,

    ////////////////////////////////////////////////////////////

    whenNotLoggedIn: `/`
};

export default PageRoutes;
