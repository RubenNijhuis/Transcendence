// Nestjs
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { FriendList, User } from "src/entities";
import Group from "src/entities/group/group.entity";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import Message from "src/entities/message/message.entity";
import Record from "src/entities/record/record.entity";

// Gateways
import { ChatSocketGateway } from "src/gateways/chat/chat.gateway";

// Services
import { GroupService } from "src/services/group/group.service";
import { MessageService } from "src/services/message/message.service";
import { RecordService } from "src/services/record/record.service";
import { UserService } from "src/services/user/user.service";

// Modules
import { FriendlistModule } from "../friendlist/friendlist.module";
import { GroupModule } from "../group/group.module";
import { UserModule } from "../user/user.module";

////////////////////////////////////////////////////////////

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      FriendList,
      Group,
      GroupUser,
      Message,
      Record
    ]),
    ConfigModule.forRoot(),
    UserModule,
    FriendlistModule,
    GroupModule,
    JwtModule
  ],
  controllers: [],
  providers: [
    ConfigService,
    GroupService,
    UserService,
    MessageService,
    ChatSocketGateway,
    RecordService
  ],
  exports: []
})
export class ChatModule {}
