import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway(3002, {
  cors: {
    origin: "*",
    credentials: false
  }
})
export class ChatSocketGateway {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("ChatSocketGateway");

  @SubscribeMessage("sendMessage")
  sendMessage(@MessageBody() data: any): void {
    console.log("WHAT is the dataa???????????????????", data);
    const messageExample = {
      content: {
        content: "Here is a new message"
      },
      content_type: 0,
      timestamp: "le time stamp",
      senderID: 0,
      sender: {},
      id: 0,
      group_id: 0,
      read_by: []
    };

    this.server.emit("receiveMessage", messageExample);
  }

  @SubscribeMessage("receiveMessage")
  receiveMessage(@MessageBody() message: string): void {
    this.server.emit("sendMessage", message);
  }
}
