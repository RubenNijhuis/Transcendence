// Nestjs
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";

// Socket stuff
import { Server, Socket } from "socket.io";
import * as ClientSocket from "socket.io-client";
import { io } from "socket.io-client";

// Services
import { GatewayService } from "../utils/GatewayService";

// Room manager
import RoomManager from "../utils/RoomManager";

// Message Payload types
import * as Payload from "../utils/Payloads";
import { JwtPayload } from "src/types/auth";

////////////////////////////////////////////////////////////

@WebSocketGateway(3003, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class EventSocketGateway {
  @WebSocketServer()
  private _server: Server;
  private _gameConnection: ClientSocket.Socket;
  private _chatConnection: ClientSocket.Socket;
  private roomManager: RoomManager;

  //////////////////////////////////////////////////////////

  constructor(private readonly gatewayService: GatewayService) {
    this._gameConnection = io("ws://localhost:3002", {
      query: {
        type: "EventGateway"
      }
    });

    this._chatConnection = io("ws://localhost:3001", {
      query: {
        type: "ChatGateway"
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

  @SubscribeMessage("getStatus")
  async getActive(
    @MessageBody() uid: string,
    @ConnectedSocket() client: Socket
  ) {
    const payload: Payload.Event.GameStatus = {
      memberId: uid,
      requester: client.id,
      status: false,
      gameId: null
    };

    this._gameConnection.emit("activeStatus", payload);
  }

  @SubscribeMessage("memberStatus")
  async memberStatus(
    @MessageBody() memberStatusPayload: Payload.Event.GameStatus
  ) {
    const requester = this.roomManager.getMemberByConnectionID(
      memberStatusPayload.requester
    );

    if (!requester) return;

    requester.connection.emit("memberStatus", {
      status: memberStatusPayload.status,
      gameId: memberStatusPayload.gameId
    });
  }
}
