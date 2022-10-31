import { Module } from "@nestjs/common";
import { ChatSocketGateway } from "src/gateways/chat.gateway";
import { GameSocketGateway } from "src/gateways/game.gateway";

import { GameSocketService } from "src/services/gateway/game/game.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GameSocketGateway, ChatSocketGateway],
  exports: []
})
export class WebSocketModule {}
