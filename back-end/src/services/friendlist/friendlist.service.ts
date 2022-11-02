// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// DB
import { Repository } from "typeorm";

// Types
import { FriendList } from "src/entities";

// Dtos
import { CreateFriendsDto } from "../../dtos/friendlist/create-friend.dto";
import { UserService } from "../user/user.service";

////////////////////////////////////////////////////////////

@Injectable()
export class FriendlistService {
  inject: [UserService]
  constructor(
    @InjectRepository(FriendList)
    private readonly friendlistRepository: Repository<FriendList>,
    private readonly userService: UserService
  ) {}

  private async filterOutput(friends: FriendList[]) {
    const filteredFriends = [];

    for (const friend of friends) {
      filteredFriends.push(friend.friendname);
    }
    const ret = await this.userService.getUsersOnUsernames(filteredFriends);
    return ret;
  }

  async getFriends(username: string) {
    let friends: FriendList[] = [];

    friends = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .getMany();

    return await this.filterOutput(friends);
  }

  async isFriend(username: string, friendname: string): Promise<boolean> {
    var ret: boolean = false;

    const friend = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .andWhere("friendname = :friendname OR username = :friendname", { friendname })
      .getOne();
    
    if (friend)
      ret = true;
    return ret;
  }

  async addFriend(createfriendsDto: CreateFriendsDto) {
    const newEntry = this.friendlistRepository.create(createfriendsDto);
    const saveResponse = this.friendlistRepository.save(newEntry);

    return saveResponse;
  }

  async removeFriend(username: string, friendname: string) {
    const removeFriendResponse = this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .andWhere("friendname = :friendname OR username = :friendname", { friendname })
      .execute();

    return removeFriendResponse;
  }
}
