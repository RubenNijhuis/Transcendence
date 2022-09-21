import { Repository } from "typeorm";
import { FriendList } from 'src/entities';
import { CreateFriensdDto } from "../../dtos/friendlist/create-friend.dto";
export declare class FriendlistService {
    private readonly friendlistRepository;
    constructor(friendlistRepository: Repository<FriendList>);
    getFriends(username: string): Promise<FriendList[]>;
    getFriend(username: string, friendname: string): Promise<FriendList>;
    isFriend(username: string, friendname: string): Promise<boolean>;
    addFriend(createfriendsDto: CreateFriensdDto): Promise<FriendList>;
    removeFriend(username: string, friendname: string): Promise<import("typeorm").DeleteResult>;
}
