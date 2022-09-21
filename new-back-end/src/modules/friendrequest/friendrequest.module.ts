import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendRequestController } from "../../controllers/friendrequest/friendrequest.controller";
import FriendRequests from "../../entities/friendrequest/friendrequest.entity";
import { FriendrequestService } from "../../services/friendrequest/friendrequest.service";

@Module({
  imports: [TypeOrmModule.forFeature([FriendRequests])],
  controllers: [FriendRequestController],
  providers: [FriendrequestService]
})
export class FriendRequestModule {}
