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

@WebSocketGateway(3001, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class GameSocketGateway {
  @WebSocketServer()
  connection: Server;

  ////////////////////////////////////////////////////////////

  private logger: Logger = new Logger("GameSocketGateway");
  private manager: Manager;
  private roomManager: RoomManager;

  // Misc handelers //////////////////////////////////////////

  afterInit() {
    // Init managers
    this.roomManager = new RoomManager(this.connection);
    this.manager = new Manager(this.connection);

    this.manager.run();
  }

  handleDisconnect(client: Socket) {
    this.logger.log("DISCONNECT");
    this.roomManager.removeProfileByUid(client.id);
  }

  // Game connection handelers ///////////////////////////////

  @SubscribeMessage("joinFriendlyMatch")
  joinGame(
    @MessageBody() matchPayload: FriendlyMatch,
    @ConnectedSocket() client: Socket
  ) {
    // Attach socket to profile object
    matchPayload.profile.connection = client;
    this.roomManager.addClientToRoom(matchPayload.roomID, client);

    // Send status update
    this.connection
      .to(matchPayload.roomID)
      .emit("gameStatus", { gameStatus: "joinedRoom" }); // TODO: config names should be in a config file

    const roomSize = this.roomManager.getRoomSize(matchPayload.roomID);

    // TODO: setting numbers should be in a config file
    // If room is full we update the game status
    if (roomSize === 2) {
      this.connection
        .to(matchPayload.roomID)
        .emit("gameStatus", { gameStatus: "startGame" }); // TODO: config names should be in a config file
    }
  }

  @SubscribeMessage("joinMatch")
  joinMatch(
    @MessageBody() gameRequest: GameRequest,
    @ConnectedSocket() client: Socket
  ) {
    // Attach socket to profile object
    gameRequest.profile.connection = client;

    this.roomManager.joinQue(client, gameRequest.profile);

    // Send status update
    client.emit("gameStatus", { gameStatus: "in queue" });

    this.roomManager.checkIfMatchable(gameRequest.profile);
  }
}
