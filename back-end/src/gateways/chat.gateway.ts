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
import RoomManager from "./RoomManager";

interface JoinRoomPayload {
  groupId: string;
}

////////////////////////////////////////////////////////////

@WebSocketGateway(3002, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class ChatSocketGateway {
  @WebSocketServer()
  connection: Server;

  private roomManager: RoomManager;

  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {
    this.roomManager = new RoomManager(this.connection);
  }

  ////////////////////////////////////////////////////////////

  @SubscribeMessage("connectionCheck")
  healthCheck(): void {
    this.connection.emit("connectionCheck", true);
  }

  @SubscribeMessage("joinRoom")
  async joinRoom(
    @MessageBody() joinRoomPayload: JoinRoomPayload,
    @ConnectedSocket() client: Socket
  ): Promise<void> {
    const group = await this.groupService.findGroupById(
      joinRoomPayload.groupId
    );

    if (!group) client.emit("error", "Group/Chat not found by id");

    this.roomManager.addClientToRoom(group.uid, client);
  }

  //   @SubscribeMessage("sendMessage")
  //   async newMessage(
  //     @MessageBody() sendMessagePayload: SendMessagePayload,
  //     @ConnectedSocket() client: Socket
  //   ): Promise<void> {
  //     this.roomManager.
  //   }
}
