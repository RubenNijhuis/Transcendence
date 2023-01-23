// Nestjs
import { forwardRef, Inject } from "@nestjs/common";

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
import * as ClientSocket from "socket.io-client";
import { io } from "socket.io-client";

// Types
import * as Match from "../utils/GameManager/types/match";

// Managers
import GameManager from "../utils/GameManager/GameManager";
import RoomManager, { Room } from "../utils/RoomManager";

// Services
import { UserService } from "src/services/user/user.service";
import { GatewayService } from "../utils/GatewayService";
import { GameService } from "./game.service";

// Message Payload types
import * as Payload from "../utils/Payloads";

////////////////////////////////////////////////////////////

@WebSocketGateway(3002, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class GameSocketGateway {
  @WebSocketServer()
  private _server: Server;

  //////////////////////////////////////////////////////////
  private _eventConnection: ClientSocket.Socket;
  private gameManager: GameManager;
  private roomManager: RoomManager;

  // Misc handelers //////////////////////////////////////////

  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly gameService: GameService,
    private readonly gatewayService: GatewayService
  ) {
    this._eventConnection = io("ws://localhost:3003", {
      query: {
        type: "EventGateway"
      }
    });
  }

  //////////////////////////////////////////////////////////

  afterInit(): void {
    this.roomManager = new RoomManager(this._server);
  }

  async handleConnection(client: Socket): Promise<void> {
    try {
      const uidFromConnection =
        await this.gatewayService.getMemberFromNewConnection(client);
      this.roomManager.createMember(uidFromConnection, client);
    } catch (err) {
      if (err.message === "InternalGateway") return;

      client.emit("failure", err);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket): void {
    this.roomManager.removeMemberByConnectionID(client.id);
  }

  //////////////////////////////////////////////////////////

  @SubscribeMessage("activeStatus")
  async activeStatus(
    @MessageBody() activeStatusPayload: Payload.Event.GameStatus
  ) {
    const member = this.roomManager.getMemberByID(activeStatusPayload.memberId);

    if (!member) {
      activeStatusPayload.status = false;
      activeStatusPayload.gameId = null;
    } else {
      if (member.roomID !== Room.DefaultID) {
        activeStatusPayload.status = true;
        activeStatusPayload.gameId = member.roomID;
      } else {
        activeStatusPayload.status = false;
        activeStatusPayload.gameId = null;
      }
    }

    this._eventConnection.emit("memberStatus", activeStatusPayload);
  }

  //////////////////////////////////////////////////////////

  @SubscribeMessage("joinQueue")
  async joinQueue(
    @MessageBody() joinQueuePayload: Payload.Game.JoinQueue,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    if (!member) {
      client.emit("failure", "No member found with your socket");
      return;
    }

    this.roomManager.setMemberData(member.uid, {
      gameType: joinQueuePayload.gameType
    });

    const queueRoomName = `${joinQueuePayload.gameType}-queue`;
    this.roomManager.addMemberToRoom(member, queueRoomName);
    client.emit("gameStatus", Match.Status.Queue);

    // If there are multiple people in the que do we look for a teammate
    // TODO: if waiting takes too long send a status message
    const queRoomSize = this.roomManager.getRoomSize(queueRoomName);
    if (queRoomSize <= 1) {
      client.emit("gameStatus", Match.Status.NoMatch);
      return;
    }

    // We get all the other members from the queue
    const queueRoomMembers = this.roomManager.getRoomMembers(queueRoomName);

    // Find a match
    const matchedOpponent = this.gameService.findAnotherPlayer(
      member,
      queueRoomMembers,
      (player, opponent) => {
        // TOOD: add checks for blocked
        if (player.data.gameType === opponent.data.gameType) return true;

        return true;
      }
    );

    // If no match was found do something here
    // TODO: only run after a certain amount of time
    if (!matchedOpponent) {
      client.emit("matchStatus", Match.Status.NoMatch);
      return;
    }

    // Setup new room
    const newRoomName = `${member.uid}-${matchedOpponent.uid}`;
    this.roomManager.addMemberToRoom([member, matchedOpponent], newRoomName);

    // Send the opponent data to each player
    member.connection.emit("matchedWith", matchedOpponent.uid);
    matchedOpponent.connection.emit("matchedWith", member.uid);

    this.roomManager.logServer();

    // Send new game status to players
    this._server.to(newRoomName).emit("gameStatus", Match.Status.Matched);
  }

  @SubscribeMessage("leaveQueue")
  async leaveQueue(@ConnectedSocket() client: Socket) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    this.roomManager.removeMemberFromRoom(member, member.roomID);
  }

  @SubscribeMessage("friendlyMatch")
  async friendlyMatch(
    @MessageBody() matchPayload: Payload.Game.FriendlyMatch,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    this.roomManager.addMemberToRoom(member, "friendly");

    // We get all the other members from the queue
    const queRoomSize = this.roomManager.getRoomSize("queue");
    if (queRoomSize <= 1) {
      client.emit("gameStatus", Match.Status.NoMatch);
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
    this._server.to(newRoomName).emit("gameStatus", Match.Status.Matched);
  }

  //////////////////////////////////////////////////////////

  @SubscribeMessage("batPositionUpdate")
  async joinGame(
    @MessageBody() batPositionPayload: Payload.Game.BatPositionUpdate,
    @ConnectedSocket() client: Socket
  ) {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    console.log(
      `New bat position update from ${member.uid} in room ${member.roomID} data: ${batPositionPayload}`
    );
  }
}
