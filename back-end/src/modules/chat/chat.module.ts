import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList, User } from "src/entities";
import Group from "src/entities/group/group.entity";
import { ChatSocketGateway } from "src/gateways/chat.gateway";
import { GameSocketGateway } from "src/gateways/game/game.gateway";
import { GroupService } from "src/services/group/group.service";
import { MessageService } from "src/services/message/message.service";
import { UserService } from "src/services/user/user.service";
import { FriendlistModule } from "../friendlist/friendlist.module";
import { GroupModule } from "../group/group.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FriendList]),
    TypeOrmModule.forFeature([Group]),
    ConfigModule.forRoot(),
    UserModule,
    FriendlistModule,
    GroupModule
  ],
  controllers: [],
  providers: [GroupService, UserService, MessageService, ChatSocketGateway],
  exports: []
})
export class ChatModule {}
