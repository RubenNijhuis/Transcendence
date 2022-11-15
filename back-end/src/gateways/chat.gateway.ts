import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
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

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  @SubscribeMessage("connectionCheck")
  healthCheck(): void {
    this.server.emit("connectionCheck", true);
  }

  @SubscribeMessage("newMessage")
  newMessage(@MessageBody() message: string): void {
    this.server.emit("newMessage", message);
  }
}
