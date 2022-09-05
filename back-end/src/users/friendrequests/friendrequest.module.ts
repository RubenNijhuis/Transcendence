import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendRequestController } from "./friendrequest.controller";
import FriendRequests from "./friendrequest.entity";
import { FriendrequestService } from "./friendrequest.service";

@Module({
    imports: [TypeOrmModule.forFeature([FriendRequests])],
    controllers: [FriendRequestController],
    providers: [FriendrequestService],
})
export class FriendRequestModule {}