// Nestjs
import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { BlockList, FriendList, User } from "src/entities";
import Group from "src/entities/group/group.entity";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import Message from "src/entities/message/message.entity";
import Record from "src/entities/record/record.entity";

// Gateways
import { GameSocketGateway } from "src/gateways/game/game.gateway";

// Services
import { GroupService } from "src/services/group/group.service";
import { MessageService } from "src/services/message/message.service";
import { RecordService } from "src/services/record/record.service";
import { UserService } from "src/services/user/user.service";
import { BlockListModule } from "../blocklist/blocklist.module";

// Modules
import { FriendlistModule } from "../friendlist/friendlist.module";
import { FriendRequestModule } from "../friendrequest/friendrequest.module";
import { GroupModule } from "../group/group.module";
import { MatchHistoryModule } from "../matchhistory/matchhistory.module";
import { UserModule } from "../user/user.module";

////////////////////////////////////////////////////////////

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      FriendList,
      BlockList,
      Group,
      GroupUser,
      Message,
      Record
    ]),
    ConfigModule.forRoot(),
    UserModule,
    FriendlistModule,
    forwardRef(() => BlockListModule),
    forwardRef(() => MatchHistoryModule),
    JwtModule
  ],
  controllers: [],
  providers: [
    ConfigService,
    GroupService,
    UserService,
    MessageService,
    GameSocketGateway,
    RecordService
  ],
  exports: []
})
export class GameModule {}
