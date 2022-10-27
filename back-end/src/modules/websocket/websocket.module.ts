import { Module } from "@nestjs/common";
import { GameSocketGateway } from "src/gateways/game.gateway";
import { GameSocketService } from "src/services/gateway/game/game.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GameSocketGateway],
  exports: []
})
export class WebSocketModule {}
