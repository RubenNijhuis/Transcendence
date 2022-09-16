import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendRequestController } from "../controllers/friendrequest.controller";
import FriendRequests from "../entities/friendrequest.entity";
import { FriendrequestService } from "../services/friendrequest.service";

@Module({
    imports: [TypeOrmModule.forFeature([FriendRequests])],
    controllers: [FriendRequestController],
    providers: [FriendrequestService],
})
export class FriendRequestModule {}