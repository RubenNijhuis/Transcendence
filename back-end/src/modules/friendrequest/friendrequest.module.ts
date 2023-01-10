// Nestjs
import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entitites
import { User } from "src/entities";
import FriendRequest from "../../entities/friendrequest/friendrequest.entity";

// Controller
import { FriendRequestController } from "../../controllers/friendrequest/friendrequest.controller";

// Service
import { FriendrequestService } from "../../services/friendrequest/friendrequest.service";

// Module
import { UserModule } from "../user/user.module";

////////////////////////////////////////////////////////////

@Module({
  imports: [
    TypeOrmModule.forFeature([User, FriendRequest]),
    FriendRequestModule,
    forwardRef(() => UserModule)
  ],
  controllers: [FriendRequestController],
  providers: [FriendrequestService],
  exports: [FriendrequestService]
})
export class FriendRequestModule {}
