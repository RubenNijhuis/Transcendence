import { Module } from "@nestjs/common";
import { GameSocketGateway } from "src/gateways/game/game.gateway";
import { GameSocketService } from "../../services/gateway/game/game.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GameSocketService, GameSocketGateway]
})
export class GameModule {}
