import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList, FriendRequest, User } from "src/entities";
import { FriendlistController } from "../../controllers/friendlist/friendlist.controller";
import { FriendlistService } from "../../services/friendlist/friendlist.service";
import { FriendRequestModule } from "../friendrequest/friendrequest.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FriendList, FriendRequest]),
    forwardRef(() => UserModule),
    forwardRef(() => FriendRequestModule)
  ],
  controllers: [FriendlistController],
  providers: [FriendlistService],
  exports: [FriendlistService]
})
export class FriendlistModule {}
