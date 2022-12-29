import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

// Services
import { GroupService } from "src/services/group/group.service";
import { UserService } from "src/services/user/user.service";
import { MessageService } from "src/services/message/message.service";

// Room manager
import RoomManager from "../utils/RoomManager";

// Message Payload types
import * as Payload from "../utils/PayloadTypes";

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

  ////////////////////////////////////////////////////////////

  private _roomManager: RoomManager;

  ////////////////////////////////////////////////////////////

  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {
    this._roomManager = new RoomManager(this._server);
  }

  ////////////////////////////////////////////////////////////

  handleConnection(client: Socket) {
    const authToken = client.handshake.query.accessToken;

    // TODO: Get the profile uid based on the data in the access token;
    const uid = client.handshake.query.uid as string;

    if (!uid) {
      client.emit("failure", "DEBUG No uid specified during handshake");
    }
    if (!authToken) {
      client.emit("failure", "No auth token specified during handshake");
      client.disconnect();
    }

    this._roomManager.createMember(uid, client);

    // Could be used to streamline room manager library
    client.data.uid = uid;
  }

  handleDisconnect(client: Socket): void {
    this._roomManager.removeMemberByConnectionID(client.id);
  }

  ////////////////////////////////////////////////////////////

  @SubscribeMessage("joinRoom")
  async joinRoom(
    @MessageBody() joinRoomPayload: Payload.JoinRoom,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const member = this._roomManager.getMemberByConnectionID(client.id);
    if (!member) {
      client.emit("register", { status: false });
      return;
    }

    const room = await this.groupService.findGroupById(joinRoomPayload.roomID);
    if (!room) {
      client.emit("failure", { status: "Unable to find room with that ID" });
      return;
    }

    this._roomManager.addMemberToRoom(member, joinRoomPayload.roomID);
  }

  @SubscribeMessage("sendMessage")
  async newMessage(
    @MessageBody() sendMessagePayload: Payload.NewMessage,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const member = this._roomManager.getMemberByConnectionID(client.id);

    // TODO: check if member isn't muted in the chat

    // Confirm to them that they registered
    if (!member) {
      client.emit("register", { status: false });
      return;
    }

    // If the member isn't part of a room then we block them from sending a message
    if (member.roomID === "unset") {
      client.emit("failure", {
        status: "No room joined before sending message"
      });
      return;
    }

    // Add the message to the database
    this.messageService.createMessage(
      member.uid,
      member.roomID,
      sendMessagePayload.content,
      sendMessagePayload.content_type
    );

    // Send message to all other room members
    client.emit("newMessage", sendMessagePayload.content);
  }
}
