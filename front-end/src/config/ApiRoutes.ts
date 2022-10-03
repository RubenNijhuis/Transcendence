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
    getUserByAuthToken: () => `/user/getUserFromAccessToken`,

    // Profiles
    getProfileByUserName: (userName: string) => `/user/${userName}`,

    // Account setup
    uploadProfileImage: () => `/user/upload-banner-pic`,
    uploadBannerImage: () => `/user/upload-banner-pic`,

    // Chat
    getChatByUserName: (userName: string) => `/chats/${userName}`,

    // Leaderboard
    getLeaderboard: () => `/leaderboard`,

    // Auth
    getLoginRoute: () => `/auth/login`,
    confirmLogin: (code: string) => `/auth/confirm?token=${code}`,
    refreshAuthToken: () => `/auth/refresh`
};

export default ApiRoutes;
