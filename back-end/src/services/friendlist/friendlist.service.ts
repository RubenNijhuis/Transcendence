// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// DB
import { DeleteResult, Repository } from "typeorm";

// Types
import { FriendList, FriendRequest } from "src/entities";

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

  private async filterOutput(username: string, friends: FriendList[]) {
    const filteredFriends = [];

    for (const friend of friends) {
      let name = friend.friendname;

      if (name === username)
        name = friend.username;
      filteredFriends.push(name);
    }
    const ret = await this.userService.getUsersOnUsernames(filteredFriends);
    return ret;
  }

  async getFriends(username: string) {
    const friends: FriendList[] = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .getMany();

    return await this.filterOutput(username, friends);
  }

  async isFriend(username: string, friendname: string): Promise<boolean> {
    let ret: boolean = false;

    const friend: FriendList = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .andWhere("friendname = :friendname OR username = :friendname", { friendname })
      .getOne();
    
    if (friend)
      ret = true;
    return ret;
  }

  async addFriend(createfriendsDto: CreateFriendsDto): Promise<FriendList> {
    const newEntry: FriendList = this.friendlistRepository.create(createfriendsDto);
    const saveResponse: FriendList = await this.friendlistRepository.save(newEntry);

    return saveResponse;
  }

  async removeFriend(username: string, friendname: string): Promise<DeleteResult> {
    const removeFriendResponse: DeleteResult = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where("username = :username AND friendname = :friendname", { username, friendname })
      .orWhere("username = :friendname AND friendname = :username", { friendname, username })
      .execute();

    return removeFriendResponse;
  }
}
