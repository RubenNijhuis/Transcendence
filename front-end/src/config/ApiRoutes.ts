/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple, every
 * route is a function
 */
const ApiRoutes = {
    // Config //////////////////////////////////////////////////
    baseUrl: () => `http://127.0.0.1:8080/api/`,
    // Config //////////////////////////////////////////////////

    // User ////////////////////////////////////////////////////
    createUser: () => `/user/setUser`,
    getUserByAccessToken: () => `/auth/getUserFromAccessToken`,

    getProfileImageByUsername: (username: string) =>
        `/user/get-img/profile/${username}`,
    getProfileBannerByUsername: (username: string) =>
        `/user/get-img/banner/${username}`,
    // User ////////////////////////////////////////////////////

    // Friend //////////////////////////////////////////////////
    getFriends: (username: string) => `/friends?username=${username}`,
    addFriend: () => `/friends/addFriend`,
    isFriend: () => `/friends/isFriend`,
    // Friend //////////////////////////////////////////////////

    // Profile /////////////////////////////////////////////////
    getProfileByUsername: (username: string) => `/user/${username}`,
    // Profile /////////////////////////////////////////////////

    // Account creation ////////////////////////////////////////
    uploadProfileImage: () => `/user/upload-profile-pic`,
    uploadBannerImage: () => `/user/upload-banner-pic`,
    // Account creation ////////////////////////////////////////

    // Chat ////////////////////////////////////////////////////
    getChatsByUsername: (username: string) => `/group/${username}`,
    createChat: () => `/group/create`,
    // Chat ////////////////////////////////////////////////////

    // Leaderboard /////////////////////////////////////////////
    getLeaderboard: () => `/leaderboard`,
    // Leaderboard /////////////////////////////////////////////

    // Authentication //////////////////////////////////////////
    getLoginRoute: () => `/auth/login`,
    confirmLogin: (code: string) => `/auth/confirm?token=${code}`,
    refreshAuthToken: () => `/auth/refresh`,
    // Authentication //////////////////////////////////////////

    // Websockets //////////////////////////////////////////////
    socketRoute: () => `ws://localhost:8080/`
    // Websockets //////////////////////////////////////////////
};

export default ApiRoutes;
