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

// Services
import { GroupService } from "src/services/group/group.service";
import { UserService } from "src/services/user/user.service";
import { MessageService } from "src/services/message/message.service";
import { JwtService } from "@nestjs/jwt";

// Room manager
import RoomManager from "../utils/RoomManager";

// Message Payload types
import * as Payload from "../utils/Payloads";
import { JwtPayload } from "src/types/auth";

////////////////////////////////////////////////////////////

@WebSocketGateway(3002, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class ChatSocketGateway {
  @WebSocketServer()
  private _server: Server;

  //////////////////////////////////////////////////////////

  private roomManager: RoomManager;

  //////////////////////////////////////////////////////////

  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService
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

    if (!userFromJwt || !userFromJwt.uid) {
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

  @SubscribeMessage("joinRoom")
  async joinRoom(
    @MessageBody() joinRoomPayload: Payload.Chat.JoinRoom,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const member = this.roomManager.getMemberByConnectionID(client.id);

    const room = await this.groupService.findGroupById(joinRoomPayload.roomID);
    if (!room) {
      client.emit("failure", { status: "Unable to find room with that ID" });
      return;
    }

    this.roomManager.addMemberToRoom(member, joinRoomPayload.roomID);
  }

  @SubscribeMessage("sendMessage")
  async newMessage(
    @MessageBody() sendMessagePayload: Payload.Chat.NewMessage,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const member = this.roomManager.getMemberByConnectionID(client.id);
    // TODO: check if member isn't muted in the chat

    // If the member isn't part of a room then we block them from sending a message
    if (member.roomID === "unset") {
      client.emit("failure", {
        status: "No room joined before sending message"
      });
      return;
    }

    // Add the message to the database
    const messageSaveResponse = await this.messageService.createMessage(
      member.uid,
      member.roomID,
      sendMessagePayload.content,
      sendMessagePayload.content_type
    );

    delete messageSaveResponse["group"];

    // Send message to all other room members
    client.emit("receiveMessage", messageSaveResponse);
  }
}
