import { Module } from "@nestjs/common";
import { ChatSocketGateway } from "src/gateways/chat.gateway";
import { GameSocketGateway } from "src/gateways/game/game.gateway";

@Module({
  imports: [],
  controllers: [],
  providers: [GameSocketGateway, ChatSocketGateway],
  exports: []
})
export class WebSocketModule {}
