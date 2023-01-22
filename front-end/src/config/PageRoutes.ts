/**
 * Describes all the routes the front-end can access
 */
const PageRoutes = {
    home: `/`,

    ////////////////////////////////////////////////////////

    selectGame: `/select-game-type`,
    pong: `/play`,

    ////////////////////////////////////////////////////////

    createAccount: `/create-account`,
    login: `/login`,

    ////////////////////////////////////////////////////////

    profile: `/profile`,
    profileWithUsername: (username: string) => `/profile/${username}`,
    chat: `/chat`,
    leaderBoard: `/leaderboard`,

    settings: `/settings`,

    ////////////////////////////////////////////////////////

    whenNotLoggedIn: `/login`,
};

export default PageRoutes;
