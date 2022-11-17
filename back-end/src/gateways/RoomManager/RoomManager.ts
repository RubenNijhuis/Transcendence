import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { Profile, Room } from "../game/Manager/types";

const QUE_IDENTIFIER = "queue";

/**
 * const rooms = this.connection.sockets.adapter.rooms.entries();
 * const sids = this.connection.sockets.adapter.sids.entries();
 */

class RoomManager {
  connection: Server;
  logger: Logger;
  rooms: Room[];
  profiles: Profile[];

  constructor(connection: Server) {
    this.connection = connection;
    this.profiles = [];
    this.rooms = [];

    // DEBUG
    this.logger = new Logger("Room Manager");
  }

  joinQue(connection: Socket, profilePayload: Profile): void {
    connection.join(QUE_IDENTIFIER);
    this.addProfile(profilePayload);
  }

  addProfile(profile: Profile): void {
    this.profiles.push(profile);
  }

  removeProfile(uid: string): void {
    const profileIndex = this.profiles.findIndex((item) => item.uid === uid);
    this.profiles.slice(profileIndex, 1);
  }

  createRoom(roomID: string, connection: Socket): void {
    this.addClientToRoom(roomID, connection);
  }

  removeClientFromRoom(roomID: string, connection: Socket): void {
    connection.leave(roomID);
  }

  addClientToRoom(roomID: string, connection: Socket): void {
    connection.join(roomID);
  }

  getRoomConnection(roomID: string): Set<string> {
    const room = this.connection.sockets.adapter.rooms.get(roomID);
    return room;
  }

  getProfilesByRoom(roomID: string): Profile[] {
    const roomIndex = this.rooms.findIndex((item) => {
      return item.roomID === roomID;
    });

    return this.rooms[roomIndex].profiles;
  }

  calculateELODiff(elo1: number, elo2: number): boolean {
    return Math.abs(elo1 - elo2) < 200;
  }

  makeMatch(player1SID: Profile, player2SID: Profile) {
    const roomID = "abc";
    player1SID.socket.join(roomID);
    player2SID.socket.join(roomID);

    this.connection.to(roomID).emit("gameStatus", { gameStatus: "startGame" });
  }

  checkIfMatchable(profile: Profile) {
    for (const player of this.profiles) {
      if (player.uid !== profile.uid) {
        if (this.calculateELODiff(profile.elo, player.elo)) {
          this.makeMatch(profile, player);
        }
      }
    }
  }

  getRoomSize(roomID: string): number {
    const size = this.connection.sockets.adapter.rooms.get(roomID).size;
    return size;
  }
}

export default RoomManager;
