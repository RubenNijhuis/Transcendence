/**
 * Describes all the routes the front-end can access
 */
const PageRoutes = {
    home: `/`,
    about: `/about`,

    play: `/play`,
    pong: `/pong`,
    newPong: `/new-pong`,

    authRedirect: `/auth/succesful-login`,
    createAccount: `/create-account`,

    profile: `/profile`,
    profileWithUserName: (userName: string) => `/profile/${userName}`,
    chat: `/chat`,
    leaderBoard: `/leaderboard`,

    whenNotLoggedIn: `/`
};

export default PageRoutes;
