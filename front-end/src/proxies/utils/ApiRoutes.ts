/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple every route
 * is a function
 */

const ApiRoutes = {
    // User
    createUser: () => `/api/users/create`,
    getUser: (id: string) => `/api/id/${id}`,

    // Chat
    getChats: (id: string) => `/api/chats/${id}`,

    // Leaderboard
    getLeaderboard: () => `/api/leaderboard`,

    // Auth
    loginConfirm: (code: string) => `/api/auth/confirm?token=${code}`
};

export default ApiRoutes;
