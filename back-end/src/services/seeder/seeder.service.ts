import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  randColor,
  randFullName,
  randParagraph,
  randUserName
} from "@ngneat/falso";
import { FriendList, User } from "src/entities";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { FriendlistService } from "../friendlist/friendlist.service";
import { UserService } from "../user/user.service";

@Injectable()
export class SeederService {
  inject: [FriendlistService, UserService];
  constructor(
    private readonly userServ: UserService,
    private readonly friendsServ: FriendlistService
  ) {}

  async seedCustom(amount: number): Promise<User[]> {
    try {
      for (let i = 0; i < amount; i++) {
        let genIntraId = randUserName();
        await this.userServ.createUser(genIntraId, "lolo");
        await this.userServ.setUser(genIntraId, {
          username: randFullName(),
          color: randColor().toString(),
          description: randParagraph()
        });
      }
      return this.userServ.getUsers();
    } catch (err) {
      console.error(err);
      throw errorHandler(
        err,
        "Failed to seed database",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async getFriendIndexes(friends): Promise<number[]> {
    const indexes: number[] = [];

    for (let i = 0; i < friends.length; i++) {
      indexes.push((await this.userServ.findUserByUsername(friends[i].usernme)).index);
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

    for (let i = 0; i < users.length; i++) {
      const user: User = users[i];
      const friends: string[] = await this.friendsServ.getFriends(
        user.username
      );
      const entry = {
        username: user.username,
        amount: friends.length,
        friends: friends
      };
      ret.push(entry);
    }
    return ret;
  }

  async seedFriends() {
    try {
      const users: User[] = await this.userServ.getUsers();
      const filteredUsers: User[] = this.filterUsers(users);
      const maxFriends: number = filteredUsers.length - 1; // minus 1 for the user itself

      // loop trough users
      for (let i = 0; i < filteredUsers.length; i++) {
        const user: User = filteredUsers[i];
        const currentFriends = await this.friendsServ.getFriends(
          user.username
        );
        const targetAmount: number = this.randomNum(0, maxFriends);
        const excludeList: number[] = await this.getFriendIndexes(
          currentFriends
        );

        excludeList.push(user.index);
        // if not target amount of friends, add friends until target
        if (currentFriends.length < targetAmount) {
          for (let i = currentFriends.length; i <= targetAmount; i++) {
            let randomIndex: number;
            let newFriend: User;

            // get random number which is not in exlude list
            while (
              excludeList.includes(
                (randomIndex = this.randomNum(1, maxFriends + 1)) + 1) && users[randomIndex].isInitialized
            ) {}
            // eslint-disable-next-line prefer-const
            newFriend = users[randomIndex];
            // get username of random index
            // add new friend to friends && exclude list
            const query = {
              username: user.username,
              friendname: newFriend.username
            };
            this.friendsServ.addFriend(query);
            excludeList.push(newFriend.index);
          }
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