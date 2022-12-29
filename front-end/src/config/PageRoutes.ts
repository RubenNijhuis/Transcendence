/**
 * Describes all the routes the front-end can access
 */
const PageRoutes = {
    home: `/`,

    ////////////////////////////////////////////////////////

    selectGame: `/select-pong`,
    pong: `/pong`,
    newPong: `/new-pong`,

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
