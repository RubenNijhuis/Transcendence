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
import GameManager from "./GameManager/GameManager";
import RoomManager from "../RoomManager";
import { Match } from "./GameManager/types";

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
  private manager: GameManager;
  private roomManager: RoomManager;

  // Misc handelers //////////////////////////////////////////

  afterInit() {
    // Init managers
    this.roomManager = new RoomManager(this.connection);
    this.manager = new GameManager(this.connection);

    this.manager.run();
  }

  handleDisconnect(client: Socket) {
    this.logger.log("DISCONNECT");
    this.roomManager.removeProfileByUid(client.id);
  }

  // Game connection handelers ///////////////////////////////

  @SubscribeMessage("joinFriendlyMatch")
  joinGame(
    @MessageBody() matchPayload: Match.Request,
    @ConnectedSocket() client: Socket
  ) {
    const { profile } = matchPayload;
    const roomID = "Bla"; // Needs to be generated somehow

    profile.connection = client;

    if (matchPayload.scoreType === Match.ScoreType.Friendly) {
    }

    // Attach socket to profile object
    this.roomManager.addClientToRoom(roomID, client);

    // Send status update
    this.connection.to(roomID).emit("gameStatus", { gameStatus: "joinedRoom" }); // TODO: config names should be in a config file

    // TODO: setting numbers should be in a config file
    // If room is full we update the game status
    const roomSize = this.roomManager.getRoomSize(roomID);
    if (roomSize === 2) {
      this.connection
        .to(roomID)
        .emit("gameStatus", { gameStatus: "startGame" }); // TODO: config names should be in a config file
    }
  }

  @SubscribeMessage("joinMatch")
  joinMatch(
    @MessageBody() gameRequest: Match.Request,
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
