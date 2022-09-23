/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple every 
 * route is a function
 */

const ApiRoutes = {
    // User
    createUser: () => `/api/user/create`,
    getUserByUserName: (userName: string) => `/api/user/${userName}`,

    // Chat
    getChatByUserName: (userName: string) => `/api/chats/${userName}`,

    // Leaderboard
    getLeaderboard: () => `/api/leaderboard`,

    // Auth
    confirmLogin: (code: string) => `/api/auth/confirm?token=${code}`,
    getLoginRoute: () => `/api/auth/login`
};

export default ApiRoutes;
