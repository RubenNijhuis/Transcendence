import { CreateFriensdDto } from "src/dtos/friendlist";
import { FriendlistService } from "src/services/friendlist/friendlist.service";
export declare class FriendlistController {
    private readonly friendlistService;
    constructor(friendlistService: FriendlistService);
    getfriends(username: any): Promise<import("../../entities").FriendList[]>;
    getfriend(createfriendsDto: CreateFriensdDto): Promise<import("../../entities").FriendList>;
    isfriend(createfriendsDto: CreateFriensdDto): Promise<boolean>;
    addfriend(createfriendsDto: CreateFriensdDto): Promise<import("../../entities").FriendList>;
    removefriend(createfriendsDto: CreateFriensdDto): Promise<import("typeorm").DeleteResult>;
}
