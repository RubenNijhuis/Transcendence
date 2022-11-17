// Sockets
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";

// Logger
import { Logger } from "@nestjs/common";

// Game elements
import Manager from "./Manager/Manager";
import RoomManager from "../RoomManager";
import { FriendlyMatch, GameRequest } from "./Manager/types";

let roomName = "a";
const waitingRoomName = "waitingRoom";
const roomOccupation = {};

@WebSocketGateway(3001, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class GameSocketGateway {
  @WebSocketServer()
  connection: Server;

  private logger: Logger = new Logger("GameSocketGateway");
  private manager: Manager;
  private roomManager: RoomManager;

  afterInit() {
    this.logger.log("✅ Game gateway - Initialized ");

    this.roomManager = new RoomManager(this.connection);

    this.manager = new Manager(this.connection);
    this.manager.run();
  }

  @SubscribeMessage("joinFriendlyMatch")
  joinGame(
    @MessageBody() matchPayload: FriendlyMatch,
    @ConnectedSocket() client: Socket
  ) {
    matchPayload.profile.socket = client;
    this.roomManager.addClientToRoom(matchPayload.roomID, client);

    this.connection
      .to(roomName)
      .emit("gameStatus", { gameStatus: "joinedRoom" });

    const roomSize = this.roomManager.getRoomSize(roomName);

    if (roomSize === 2) {
      this.connection
        .to(roomName)
        .emit("gameStatus", { gameStatus: "startGame" });
    }
  }

  @SubscribeMessage("joinMatch")
  joinMatch(
    @MessageBody() gameRequest: GameRequest,
    @ConnectedSocket() client: Socket
  ) {
    gameRequest.profile.socket = client;
    this.roomManager.joinQue(client, gameRequest.profile);

    client.emit("gameStatus", { gameStatus: "in queue" });

    this.roomManager.checkIfMatchable(gameRequest.profile);
  }

  /**
   * Join game
   * - If not friend
   *   Go in room
   *     - If room.members.length > 1
   *        join room
   *        start game
   *    - else
   *        join room
   *        wait for another player
   * - If friend
   *    - Make room
   *    - Put both players in room
   *    - Send game status start
   *
   *
   */
  /////////////////

  //   @SubscribeMessage("messageWaitingRoom")
  //   handleMessageWaitingRoom(@MessageBody() message_w: string): void {
  //     //this.connection.emit('message_w', message_w);
  //     this.connection.to(waitingRoomName).emit("message_w", message_w);
  //   }

  //Lets a Client join the waiting room
  //   @SubscribeMessage("joinWaitingRoom")
  //   handleJoinWaitingRoom(client: Socket) {
  //     client.join(waitingRoomName);

  //     this.connection.to(waitingRoomName).emit("waitingRoomJoinMessage", {
  //       client: client.id,
  //       room: waitingRoomName
  //     });
  //   }

  //   @SubscribeMessage("joinGameRoom")
  //   handleJoinGame(client: Socket) {
  //     client.join(roomName);
  //     roomOccupation[roomName] = this.connection.rooms[roomName].size;
  //     this.connection
  //       .to(roomName)
  //       .emit("gameRoomJoinMessage", { client: client.id, room: roomName });
  //     if (this.connection.rooms[roomName].size === 2) {
  //       roomName = makeid(10);
  //     }
  //     console.log(roomOccupation);
  //   }

  //   @SubscribeMessage("leaveWaitingRoom")
  //   handleLeaveWaitingRoom(client: Socket) {
  //     this.connection.to(waitingRoomName).emit("LeaveWaitingRoomMessage", {
  //       client: client.id,
  //       room: waitingRoomName
  //     });
  //     client.leave(waitingRoomName);
  //   }

  //   @SubscribeMessage("leaveGameRoom")
  //   handleLeaveGameRoom(client: Socket) {
  //     const roomInfo = client.rooms;
  //     let room: string;
  //     for (const item of roomInfo) {
  //       room = item;
  //     }
  //     this.connection
  //       .to(room)
  //       .emit("LeaveGameRoomMessage", { client: client.id, room: room });
  //     roomOccupation[room] -= 1;
  //     if (roomOccupation[room] === 0) {
  //       delete roomOccupation[room];
  //     }

  //     client.leave(room);

  //     console.log(roomOccupation);
  //   }
}
