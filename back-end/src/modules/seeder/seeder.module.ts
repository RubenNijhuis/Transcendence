import { Module } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList, User } from "src/entities";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "src/controllers/user/user.controller";
import { SeederController } from "src/controllers/seeder/seeder.controller";
import { FriendlistService } from "src/services/friendlist/friendlist.service";
import { UserModule } from "../user/user.module";
import { FriendlistModule } from "../friendlist/friendlist.module";
import { UserSeederService } from "src/services/seeder/user.seeder.service";
import { FriendSeederService } from "src/services/seeder/friend.seeder.service";
import { GroupseederService } from "src/services/seeder/group.seeder.service";
import { GroupModule } from "../group/group.module";
import Group from "src/entities/group/group.entity";

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
  controllers: [SeederController],
  providers: [UserSeederService, FriendSeederService, GroupseederService]
})
export class SeederModule {}
