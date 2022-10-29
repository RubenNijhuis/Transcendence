import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { Logger } from "@nestjs/common";

let roomName = makeid(10);
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
  server: Server;

  private logger: Logger = new Logger("GameSocketGateway");

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  @SubscribeMessage("healthCheck")
  healthCheck(@MessageBody() message: string): void {
    console.log("socket message healthcheck: ", message);
    const ret = this.server.emit("message: ", message);
    console.log("emit ret: ", ret);
  }

  @SubscribeMessage("messageToAll")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("message", message);
  }

  @SubscribeMessage("messageWaitingRoom")
  handleMessageWaitingRoom(@MessageBody() message_w: string): void {
    //this.server.emit('message_w', message_w);
    this.server.to(waitingRoomName).emit("message_w", message_w);
  }

  //Lets a Client join the waiting room
  @SubscribeMessage("joinWaitingRoom")
  handleJoinWaitingRoom(client: Socket) {
    client.join(waitingRoomName);
    this.server.to(waitingRoomName).emit("waitingRoomJoinMessage", {
      client: client.id,
      room: waitingRoomName
    });
  }

  @SubscribeMessage("joinGameRoom")
  handleJoinGame(client: Socket) {
    client.join(roomName);
    roomOccupation[roomName] =
      this.server.sockets.adapter.rooms.get(roomName).size;
    this.server
      .to(roomName)
      .emit("gameRoomJoinMessage", { client: client.id, room: roomName });
    if (this.server.sockets.adapter.rooms.get(roomName).size == 2)
      roomName = makeid(10);
    console.log(roomOccupation);
  }

  @SubscribeMessage("leaveWaitingRoom")
  handleLeaveWaitingRoom(client: Socket) {
    this.server.to(waitingRoomName).emit("LeaveWaitingRoomMessage", {
      client: client.id,
      room: waitingRoomName
    });
    client.leave(waitingRoomName);
  }

  @SubscribeMessage("leaveGameRoom")
  handleLeaveGameRoom(client: Socket) {
    const roomInfo = client.rooms;
    let room: string;

    for (const item of roomInfo) room = item;
    this.server
      .to(room)
      .emit("LeaveGameRoomMessage", { client: client.id, room: room });
    roomOccupation[room] -= 1;
    if (roomOccupation[room] === 0) delete roomOccupation[room];
    client.leave(room);
    console.log(roomOccupation);
  }
}

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  return result;
}
