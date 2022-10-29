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
    // User ////////////////////////////////////////////////////

    // Friend //////////////////////////////////////////////////
    getFriendsByUsername: (username: string) =>
        `/friends/getfriends?username=${username}`,
    getFriend: () => `/friends/getfriend`,
    addFriend: () => `/friends/addFriend`,
    removeFriend: () => `/friends/removeFriend`,
    getIsFriend: () => `/friends/isFriend`,
    // Friend //////////////////////////////////////////////////

    // Profile /////////////////////////////////////////////////
    getProfileByUsername: (username: string) => `/user/${username}`,

    getProfileImageByUsername: (username: string) =>
        `/user/get-img/profile/${username}`,
    getProfileBannerByUsername: (username: string) =>
        `/user/get-img/banner/${username}`,
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

    // TFAuthentication //////////////////////////////////////////
    turnOnTFA: () => `/user/enable2fa`,
    getqrTFA: () => `/tfa/google2fa`,
    confirmTFA: () => `/tfa/google2fa/authenticate`
    // TFAuthentication //////////////////////////////////////////
};

export default ApiRoutes;
