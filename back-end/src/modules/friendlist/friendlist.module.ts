import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList, User } from "src/entities";
import { UserService } from "src/services/user/user.service";
import { FriendlistController } from "../../controllers/friendlist/friendlist.controller";
import { FriendlistService } from "../../services/friendlist/friendlist.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FriendList]),
    UserModule,
  ],
  controllers: [FriendlistController],
  providers: [FriendlistService],
  exports: [FriendlistService]
})
export class FriendlistModule {}
