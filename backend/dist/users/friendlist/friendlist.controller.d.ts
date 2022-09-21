import { CreateFriensdDto } from "./dtos/create-friends.dto";
import { FriendlistService } from "./friendlist.service";
export declare class FriendlistController {
    private readonly friendlistService;
    constructor(friendlistService: FriendlistService);
    getfriends(username: any): Promise<import("./friendlist.entity").FriendList[]>;
    getfriend(createfriendsDto: CreateFriensdDto): Promise<import("./friendlist.entity").FriendList>;
    isfriend(createfriendsDto: CreateFriensdDto): Promise<boolean>;
    addfriend(createfriendsDto: CreateFriensdDto): Promise<import("./friendlist.entity").FriendList>;
    removefriend(createfriendsDto: CreateFriensdDto): Promise<import("typeorm").DeleteResult>;
}
