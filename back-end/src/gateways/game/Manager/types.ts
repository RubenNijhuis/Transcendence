import { Socket } from "socket.io";

enum GameStatus {
  Initial,
  Setup,
  Running,
  Finished
}

enum RoomPermission {
  FULL,
  MINIMAL
}

type Position = {
  posX: number;
  posY: number;
};

interface Room {
  roomID: string;
  profiles: Profile[];
}

interface FriendlyMatch {
  roomID: string;
  profile: Profile;
}

interface GameRequest {
  profile: Profile;
}

interface Profile {
  uid: string;
  connection: Socket;
  elo: number;
}

export { Room, GameStatus, Position, GameRequest, Profile, FriendlyMatch };
