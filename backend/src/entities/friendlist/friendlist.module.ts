import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FriendList } from 'src/bootstrap/typeorm';
import { FriendlistController } from "../../controllers/friendlist/friendlist.controller";
import { FriendlistService } from "../../services/friendlist/friendlist.service";

@Module({
    imports: [TypeOrmModule.forFeature([FriendList])],
    controllers: [FriendlistController],
    providers: [FriendlistService],
    exports: [FriendlistService]
})
export class FriendslistModule {}