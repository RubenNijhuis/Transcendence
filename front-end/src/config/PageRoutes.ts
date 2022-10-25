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
    profileWithUsername: (username: string) => `/profile/${username}`,
    chat: `/chat`,
    leaderBoard: `/leaderboard`,

    ////////////////////////////////////////////////////////////

    whenNotLoggedIn: `/`
};

export default PageRoutes;
