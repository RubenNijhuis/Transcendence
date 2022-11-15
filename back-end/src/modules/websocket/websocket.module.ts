import { Module } from "@nestjs/common";
<<<<<<< Updated upstream
import { GameSocketGateway } from "src/gateways/game.gateway";
=======
import { ChatSocketGateway } from "src/gateways/chat.gateway";
import { GameSocketGateway } from "src/gateways/game/game.gateway";

>>>>>>> Stashed changes
import { GameSocketService } from "src/services/gateway/game/game.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GameSocketGateway],
  exports: [GameSocketService]
})
export class FriendlistModule {}
