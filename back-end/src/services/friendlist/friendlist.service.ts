// Nestjs
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// DB
import { DeleteResult, Repository } from "typeorm";

// Types
import { FriendList, User } from "src/entities";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

// Service
import { UserService } from "../user/user.service";

////////////////////////////////////////////////////////////

@Injectable()
export class FriendlistService {
  inject: [UserService, FriendrequestService];
  constructor(
    @InjectRepository(FriendList)
    private readonly friendlistRepository: Repository<FriendList>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly friendrequestService: FriendrequestService
  ) {}

  async filterFriendlist(username: string, friends: FriendList[]) {
    const filteredFriends = friends.map((val) => {
      if (val.username === username) return val.friendname;
      else return val.username;
    });
    console.log(
      "FILTER FRIENDS DUPE: ",
      new Set(filteredFriends).size !== filteredFriends.length
    );

    const ret = this.userService.filterProfiles(
      await this.userService.getUsersOnUsernames(filteredFriends)
    );
    return ret;
  }

  // moet nog requests uit db halen
  async getFriends(username: string): Promise<FriendList[]> {
    const friends: FriendList[] = await this.friendlistRepository
      .createQueryBuilder("friend_lists")
      .where("username = :username OR friendname = :username", { username })
      .getMany();

    return friends;
  }

  async isFriend(username: string, friendname: string): Promise<boolean> {
    let ret = false;

    const friend: FriendList = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username AND friendname = :friendname", {
        username,
        friendname
      })
      .orWhere("username = :friendname AND friendname = :username", {
        friendname,
        username
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

    if ((await this.isFriend(username, friendname)) === true) {
      return;
    }

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

  async removePerson(username: string) {
    const removeFriendResponse: DeleteResult = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where({ username })
      .orWhere({ friendname: username })
      .execute();
    return removeFriendResponse;
  }
}
