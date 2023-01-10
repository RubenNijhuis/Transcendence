/**
 * All routes the front-end uses to interact with the api/backend
 *
 * Every path is a function as sometimes a parameter might
 * be required to create a full path. To keep it simple, every
 * route is a function
 */

// Config //////////////////////////////////////////////////
export const base = {
    url: `ws://${window.location.host}`,
    path: (route: string) => `/ws/${route}/socket.io`,
    connectionCheck: `connectionCheck`
};

// Game /////////////////////////////////////////////////////
export const game = {
    newBallPosition: `newBallPosition`,
    opponentProfile: `opponentProfile`,
    scoreChange: `scoreChange`,
    newMatchStatus: `newMatchStatus`,
    sendPlayerPostion: `playerPosition`
};

// chat ////////////////////////////////////////////////////
export const chat = {
    sendMessage: `sendMessage`,
    receiveMessage: `receiveMessage`
};

export const room = {
    joinRoom: `joinRoom`
};
