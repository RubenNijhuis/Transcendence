import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList } from 'src/typeorm';
import { FriendlistController } from "./friendlist.controller";
import { FriendlistService } from "./friendlist.service";

@Module({
    imports: [TypeOrmModule.forFeature([FriendList])],
    controllers: [FriendlistController],
    providers: [FriendlistService],
    exports: [FriendlistService]
})
export class FriendslistModule {}