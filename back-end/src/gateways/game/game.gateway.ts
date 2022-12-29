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
import GameManager from "../utils/GameManager/GameManager";
import RoomManager from "../utils/RoomManager";
import { Match } from "../utils/GameManager/types";

@WebSocketGateway(3001, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class GameSocketGateway {
  @WebSocketServer()
  private _server: Server;

  ////////////////////////////////////////////////////////////

  private _gameManager: GameManager;
  private _roomManager: RoomManager;

  // Misc handelers //////////////////////////////////////////

  constructor() {
    this._roomManager = new RoomManager(this._server);
  }

  afterInit() {
    // Init managers
    this._roomManager = new RoomManager(this._server);
    // this._gameManager = new GameManager(this._roomManager);
  }

  handleDisconnect(client: Socket) {
    this._roomManager.removeMemberByConnectionID(client.id);
  }

  // Game connection handelers ///////////////////////////////

  @SubscribeMessage("joinFriendlyMatch")
  joinGame(
    @MessageBody() matchPayload: Match.Request,
    @ConnectedSocket() client: Socket
  ) {
    console.log("temp");
  }
}
