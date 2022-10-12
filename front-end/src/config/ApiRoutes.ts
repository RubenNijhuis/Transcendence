/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple every
 * route is a function
 */
const ApiRoutes = {
    baseUrl: () => `http://127.0.0.1:8080/api/`,

    // User
    createUser: () => `/user/setUser`,
    getUserByAccessToken: () => `/auth/getUserFromAccessToken`,

    getProfileImageByUsername: (username: string) =>
        `/user/get-img/profile/${username}`,
    getProfileBannerByUsername: (username: string) =>
        `/user/get-img/banner/${username}`,

    // Profiles
    getProfileByUserName: (userName: string) => `/user/${userName}`,

    // Account setup
    uploadProfileImage: () => `/user/upload-profile-pic`,
    uploadBannerImage: () => `/user/upload-banner-pic`,

    // Chat
    getChatByUserName: (userName: string) => `/chats/${userName}`,

    // Leaderboard
    getLeaderboard: () => `/leaderboard`,

    // Auth
    getLoginRoute: () => `/auth/login`,
    confirmLogin: (code: string) => `/auth/confirm?token=${code}`,
    createRefreshToken: () => `/auth/createRefresh`,
    refreshAuthToken: () => `/auth/refresh`
};

export default ApiRoutes;
