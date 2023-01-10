import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockList, FriendList, FriendRequest, User } from "src/entities";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "src/controllers/user/user.controller";
import Group from "src/entities/group/group.entity";
import { FriendlistModule } from "../friendlist/friendlist.module";
import { BlockListModule } from "../blocklist/blocklist.module";
import { GroupModule } from "../group/group.module";
import { FriendRequestModule } from "../friendrequest/friendrequest.module";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { MatchHistoryModule } from "../matchhistory/matchhistory.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      FriendList,
      BlockList,
      FriendRequest,
      Group,
      MatchHistory
    ]),
    ConfigModule.forRoot(),
    PassportModule,
    forwardRef(() => FriendlistModule),
    forwardRef(() => BlockListModule),
    forwardRef(() => FriendRequestModule),
    forwardRef(() => GroupModule),
    forwardRef(() => MatchHistoryModule),
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_PRIV_SECRET,
      signOptions: { expiresIn: "365D" }
    })
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
