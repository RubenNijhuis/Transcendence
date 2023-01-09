// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// DB
import { DeleteResult, Repository } from "typeorm";

// Types
import { FriendList, FriendRequest, User } from "src/entities";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

// Service
import { UserService } from "../user/user.service";

////////////////////////////////////////////////////////////

@Injectable()
export class FriendlistService {
  inject: [UserService, FriendRequest];
  constructor(
    @InjectRepository(FriendList)
    private readonly friendlistRepository: Repository<FriendList>,
    private readonly userService: UserService,
    private readonly friendrequestService: FriendrequestService
  ) {}

  private async filterOutput(username: string, friends: FriendList[]) {
    const filteredFriends = [];

    for (const friend of friends) {
      let name = friend.friendname;

      if (name === username) name = friend.username;
      filteredFriends.push(name);
    }
    const ret = await this.userService.getUsersOnUsernames(filteredFriends);
    return ret;
  }

  // moet nog requests uit db halen
  async getFriends(username: string) {
    const friends: FriendList[] = await this.friendlistRepository
      .createQueryBuilder("friend_lists")
      .where("username = :username OR friendname = :username", { username })
      .getMany();

    return await this.filterOutput(username, friends);
  }

  async isFriend(username: string, friendname: string): Promise<boolean> {
    let ret = false;

    const friend: FriendList = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username OR friendname = :username", { username })
      .andWhere("friendname = :friendname OR username = :friendname", {
        friendname
      })
      .getOne();

    if (friend) ret = true;
    return ret;
  }

  async addFriend(uid: string, friendname: string): Promise<FriendList> {
    const user: User = await this.userService.findUserByUid(uid);
    const username: string = user.username;
    const query = {
      username: username,
      friendname: friendname
    };

    if (!this.isFriend(username, friendname)) {
      return;
    }

    console.log("addfriend");
    await this.friendrequestService.removeRequest(username, friendname); // remove request
    const newEntry: FriendList = this.friendlistRepository.create(query);
    const saveResponse: FriendList = await this.friendlistRepository.save(
      newEntry
    );

    return saveResponse;
  }

  async removeFriend(
    username: string,
    friendname: string
  ): Promise<DeleteResult> {
    const removeFriendResponse: DeleteResult = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where("username = :username AND friendname = :friendname", {
        username,
        friendname
      })
      .orWhere("username = :friendname AND friendname = :username", {
        friendname,
        username
      })
      .execute();

    return removeFriendResponse;
  }
}
