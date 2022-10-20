import { Module } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList, User } from "src/entities";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "src/controllers/user/user.controller";
import { SeederService } from "src/services/seeder/seeder.service";
import { SeederController } from "src/controllers/seeder/seeder.controller";
import { FriendlistService } from "src/services/friendlist/friendlist.service";
import { UserModule } from "../user/user.module";
import { FriendlistModule } from "../friendlist/friendlist.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FriendList]),
    ConfigModule.forRoot(),
    UserModule,
    FriendlistModule
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
