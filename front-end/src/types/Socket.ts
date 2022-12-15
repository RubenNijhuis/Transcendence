import { Socket } from "socket.io-client";

namespace SocketType {
  export enum Type {
    WaitingRoom = "waitingRoom",
    Game = "game",
    Chat = "chat",
  }

  export type Instance = Socket;

  // export type allSocketEvents = ServerToClientEvents | ClientToServerEvents;

  // export interface ServerToClientEvents {
  //     noArg: () => void;
  // }

  // export interface ClientToServerEvents {
  //     hello: () => void;
  // }
}

export default SocketType;