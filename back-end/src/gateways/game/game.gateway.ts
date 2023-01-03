// Sockets
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";

// Socket stuff
import { Socket, Server } from "socket.io";

// Types
import { Match } from "../utils/GameManager/types";

// Managers
import GameManager from "../utils/GameManager/GameManager";
import RoomManager from "../utils/RoomManager";

// Services
import { UserService } from "src/services/user/user.service";
import { JwtService } from "@nestjs/jwt";

// Message Payload types
import * as Payload from "../utils/Payloads";
import { JwtPayload } from "src/types/auth";
import { GameService } from "./game.service";

////////////////////////////////////////////////////////////

@WebSocketGateway(3001, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class GameSocketGateway {
  @WebSocketServer()
  private _server: Server;

  //////////////////////////////////////////////////////////

  private gameManager: GameManager;
  private roomManager: RoomManager;

  // Misc handelers //////////////////////////////////////////

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly gameService: GameService
  ) {
    this.roomManager = new RoomManager(this._server);
  }

  //////////////////////////////////////////////////////////

  async handleConnection(client: Socket): Promise<void> {
    const authToken = client.handshake.query.accessToken as string;
    if (!authToken) {
      client.emit("failure", "No auth token specified during handshake");
      client.disconnect();
    }

    const tokenPayload = this.jwtService.decode(authToken) as JwtPayload;

    const userFromJwt = await this.userService.findUserByintraId(
      tokenPayload.intraID
    );

    if (!userFromJwt) {
      client.emit("failure", "No user found by with token");
      client.disconnect();
    }

    const uid = userFromJwt.uid;
    this.roomManager.createMember(uid, client);
  }

  handleDisconnect(client: Socket): void {
    this.roomManager.removeMemberByConnectionID(client.id);
  }

  //////////////////////////////////////////////////////////

  @SubscribeMessage("joinQueue")
  joinQueue(
    @MessageBody() joinQueuePayload: Payload.Game.JoinQueue,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);

    this.roomManager.addMemberToRoom(member, "queue");
    client.emit("gameStatus", { status: "In Queue", message: "In Queue" });

    // Only if there are multiple people in the que do we look for a teammate
    // TODO: if waiting takes too long send a status message
    const queRoomSize = this.roomManager.getRoomSize("queue");
    if (queRoomSize <= 1) {
      client.emit("gameStatus", {
        status: "In Queue",
        message: "Waiting for another player"
      });
      return;
    }

    // We get all the other members from the queue
    const queueRoomMembers = this.roomManager.getRoomMembers("queue");

    // Find a match
    const matchedOpponent = this.gameService.findAnotherPlayer(
      member,
      queueRoomMembers,
      (player, opponent) => {
        // Let anyone match at the moment
        // Could add checks for blocked
        return true;
      }
    );

    // If no match was found do something here
    // TODO: only run after a certain amount of time
    if (!matchedOpponent) {
      client.emit("matchStatus", {
        status: "No match found"
      });
      return;
    }

    // Setup new room
    const newRoomName = `${member.uid}-${matchedOpponent.uid}`;
    this.roomManager.addMemberToRoom([member, matchedOpponent], newRoomName);

    // Send the opponent data to each player
    // TODO: let game this.roomManager do this
    member.connection.emit("newMessage", matchedOpponent.uid);
    matchedOpponent.connection.emit("newMessage", member.uid);

    this.roomManager.logServer();

    // Send new game status to players
    this._server.to(newRoomName).emit("gameStatus", {
      status: "MATCHED",
      message: "Matched"
    });
  }

  @SubscribeMessage("leaveQueue")
  leaveQueue(@ConnectedSocket() client: Socket) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    this.roomManager.removeMemberFromRoom(member, "QUEUE");
  }

  @SubscribeMessage("friendlyMatch")
  friendlyMatch(
    @MessageBody() matchPayload: Payload.Game.FriendlyMatch,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    this.roomManager.addMemberToRoom(member, "friendly");

    // We get all the other members from the queue
    const queRoomSize = this.roomManager.getRoomSize("queue");
    if (queRoomSize <= 1) {
      client.emit("gameStatus", {
        status: "In Queue",
        message: "Waiting for the other player"
      });
      return;
    }

    // See if the friend is in the list
    const friendlyRoomMembers = this.roomManager.getRoomMembers("friendly");
    const friend = this.gameService.findAnotherPlayer(
      member,
      friendlyRoomMembers,
      (player, opponent) => {
        // Is this player the same one as the member is looking for
        if (opponent.uid === matchPayload.friendId) {
          return true;
        }
      }
    );

    // Setup new room
    const newRoomName = `${member.uid}-${friend.uid}`;
    this.roomManager.addMemberToRoom([member, friend], newRoomName);

    // Send the opponent data to each player
    member.connection.emit("matchedWith", friend.uid);
    friend.connection.emit("matchedWith", member.uid);

    // Send new game status to players
    this._server.to(newRoomName).emit("gameStatus", {
      status: "MATCHED",
      message: "Matched"
    });
  }

  //////////////////////////////////////////////////////////

  @SubscribeMessage("batPositionUpdate")
  joinGame(
    @MessageBody() batPositionPayload: Payload.Game.BatPositionUpdate,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    console.log(
      `New bat position update from ${member.uid} in room ${member.roomID} data: ${batPositionPayload}`
    );
  }
}
