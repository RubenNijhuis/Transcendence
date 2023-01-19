import { Socket } from "socket.io-client";

export enum Type {
    Event = "event",
    Game = "game",
    Chat = "chat"
}

export type Instance = Socket;

// export type allSocketEvents = ServerToClientEvents | ClientToServerEvents;

// export interface ServerToClientEvents {
//     noArg: () => void;
// }

// export interface ClientToServerEvents {
//     hello: () => void;
// }
