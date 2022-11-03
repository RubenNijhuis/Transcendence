import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { FriendRequestController } from "../../controllers/friendrequest/friendrequest.controller";
import FriendRequests from "../../entities/friendrequest/friendrequest.entity";
import { FriendrequestService } from "../../services/friendrequest/friendrequest.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FriendRequests]),
    UserModule
  ],
  controllers: [FriendRequestController],
  providers: [FriendrequestService]
})
export class FriendRequestModule {}
