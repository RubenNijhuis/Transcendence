import { HttpStatus, Injectable } from "@nestjs/common";
import { FriendList, User } from "src/entities";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { FriendlistService } from "../friendlist/friendlist.service";
import { UserService } from "../user/user.service";

@Injectable()
export class FriendSeederService {
  inject: [FriendlistService, UserService];
  constructor(
    private readonly userService: UserService,
    private readonly friendsService: FriendlistService
  ) {}

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async getFriendIndexes(
    friends: FriendList[],
    username: string
  ): Promise<number[]> {
    const indexes: number[] = [];

    for (const friend of friends) {
      let index: number;
      if (friend.username == username)
        index = (await this.userService.findUserByUsername(friend.friendname))
          .index;
      else
        index = (await this.userService.findUserByUsername(friend.username))
          .index;
      indexes.push(index);
    }
    return indexes;
  }

  private filterUsers(users: User[]): User[] {
    const filteredUsers: User[] = users;

    try {
      for (let i = 0; i < filteredUsers.length; i++) {
        if (!filteredUsers[i].isInitialized) {
          filteredUsers.splice(i, 1);
          i--;
        }
      }
      return filteredUsers;
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to clean up users in seeder",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private async formulateResponse(users: User[]) {
    const ret = [];

    for (const user of users) {
      const filtered_friends: string[] = [];
      const friends: FriendList[] = await this.friendsService.getFriends(
        user.username
      );

      for (const friend of friends) {
        filtered_friends.push(friend.username);
      }
      const entry = {
        username: user.username,
        amount: friends.length,
        friends: filtered_friends
      };
      ret.push(entry);
    }
    return ret;
  }

  // makes friend connections with users
  async seedFriends() {
    try {
      const users: User[] = await this.userService.getUsers();
      const filteredUsers: User[] = this.filterUsers(users);
      const maxFriends: number = filteredUsers.length - 1; // minus 1 for the user itself

      // loop trough users
      for (const filteredUser of filteredUsers) {
        const currentFriends: FriendList[] =
          await this.friendsService.getFriends(filteredUser.username);
        const targetAmount: number = this.randomNum(0, maxFriends - 1);
        const excludeList: number[] = await this.getFriendIndexes(
          currentFriends,
          filteredUser.username
        );

        excludeList.push(filteredUser.index);
        // if not target amount of friends, add friends until target
        // console.log("user: ", filteredUser.username);
        for (let i = currentFriends.length; i <= targetAmount; i++) {
          let randomIndex: number;
          let newFriend: User;

          // get random number which is not in exlude list
          while (
            users[(randomIndex = this.randomNum(1, maxFriends + 1))]
              .isInitialized &&
            excludeList.includes(users[randomIndex].index)
          ) {}
          // eslint-disable-next-line prefer-const
          newFriend = users[randomIndex];
          // console.log("excludelist: ", excludeList);
          // console.log("new friend index: ", newFriend.index);
          // get username of random index
          // add new friend to friends && exclude list
          this.friendsService.addFriend(filteredUser.uid, newFriend.username);
          excludeList.push(newFriend.index);
        }
      }
      return this.formulateResponse(filteredUsers);
    } catch (err) {
      console.error(err);
      throw errorHandler(
        err,
        "Failed to seed database",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
