/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple, every
 * route is a function
 */
const SocketRoutes = {
    // Config //////////////////////////////////////////////////
    baseUrl: () => `ws://localhost:8080`,
    path: (route: string) => `/ws/${route}/socket.io`,
    // Config //////////////////////////////////////////////////

    // misc ////////////////////////////////////////////////////
    healthCheck: () => `healthCheck`,
    // misc ////////////////////////////////////////////////////

    // game ////////////////////////////////////////////////////
    joinWaitingRoom: () => `joinWaitingRoom`,
    leaveWaitingRoom: () => `leaveWaitingRoom`,

    joinGameRoom: () => `joinGameRoom`,
    leaveGameRoom: () => `leaveGameRoom`,

    leaveGameRoomMessage: () => `leaveGameRoomMessage`,
    // game ////////////////////////////////////////////////////

    // chat ////////////////////////////////////////////////////
    getNewMessage: () => `getNewMessage`,
    sendNewMessage: () => `sendNewMessage`,
    joinChatRoom: () => `joinChatRoom`,
    leaveChatRoom: () => `leaveChatRoom`
    // chat ////////////////////////////////////////////////////
};

export default SocketRoutes;
