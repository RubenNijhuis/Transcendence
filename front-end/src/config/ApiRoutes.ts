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
        `/friends/getfriends/${username}`,
    getFriend: () => `/friends/getfriend`,
    removeFriend: () => `/friends/removeFriend`,

    sendFriendRequest: () => `/friendrequest/sendrequest`,
    getFriendRequests: () => `/friendrequests/`,
    isRequested: (username: string, requested: string) =>
        `/friendrequest/isRequested/${username}/${requested}`,
    removeFriendRequest: () => `/friendrequest/remove`,

    getIsFriend: (username: string, friendname: string) =>
        `/friends/isFriend/${username}/${friendname}`,
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
    getChatsById: (id: string) => `/group/chats/${id}`,

    createChat: () => `/group/createGroup`,
    verifyPassword: (id: number) => `/group/${id}`,
    sendMessage: () => `/message/create`,
    // Chat ////////////////////////////////////////////////////

    // Leaderboard /////////////////////////////////////////////
    getLeaderboard: () => `/user/getLeaderboard`,
    // Leaderboard /////////////////////////////////////////////

    // Authentication //////////////////////////////////////////
    getLoginRoute: () => `/auth/login`,
    confirmLogin: (code: string) => `/auth/confirm?token=${code}`,
    refreshAuthToken: () => `/auth/refresh`,
    // Authentication //////////////////////////////////////////

    // TFAuthentication //////////////////////////////////////////
    turnOnTFA: () => `/user/enable2fa`,
    getqrTFA: () => `/tfa/google2fa`,
    confirmTFA: () => `/tfa/google2fa/authenticate`,
    // TFAuthentication //////////////////////////////////////////

	//Settings
	updateDescription: () => `/user/updateDescription`,
	updateColor: () => `/user/updateColor`,
	addBlock: () => `/block/addBlock`,
	unBlock: () => `/block/unBlock`,
	isBlock: (username: string, blockname: string) => `/block/isBlock/${username}/${blockname}`,
	isFriend: (username: string, friendname: string) => `/friends/isFriend/${username}/${friendname}`,
	addFriend: () => `/friends/addFriend`,
	unFriend: () => `/friends/removeFriend`

	//Settings


};

export default ApiRoutes;
