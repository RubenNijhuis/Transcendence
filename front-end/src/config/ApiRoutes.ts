/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple every
 * route is a function
 */
const ApiRoutes = {
    // User
    createUser: () => `/user/setUser`,
    getUserByUserName: (userName: string) => `/user/${userName}`,
    getUserByAuthToken: () => `/user/getUserFromAccessToken`,

    // Chat
    getChatByUserName: (userName: string) => `/chats/${userName}`,

    // Leaderboard
    getLeaderboard: () => `/leaderboard`,

    // Auth
    confirmLogin: (code: string) => `/auth/confirm?token=${code}`,
    getLoginRoute: () => `/auth/login`,
    refreshAuthToken: () => `/auth/refresh`
};

export default ApiRoutes;
