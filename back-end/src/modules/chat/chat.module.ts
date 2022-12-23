import { Module } from "@nestjs/common";
import { ChatSocketGateway } from "src/gateways/chat.gateway";
import { GameSocketGateway } from "src/gateways/game/game.gateway";
import { GroupService } from "src/services/group/group.service";
import { MessageService } from "src/services/message/message.service";
import { UserService } from "src/services/user/user.service";

@Module({
  imports: [],
  controllers: [],
  providers: [GroupService, UserService, MessageService, ChatSocketGateway],
  exports: []
})
export class ChatModule {}
