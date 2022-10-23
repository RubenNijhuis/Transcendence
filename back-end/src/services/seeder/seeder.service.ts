import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import {
  randColor,
  randFullName,
  randParagraph,
  randUserName
} from "@ngneat/falso";
import { filter } from "rxjs";
import { FriendRequestController } from "src/controllers/friendrequest/friendrequest.controller";
import { FriendList, User } from "src/entities";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { FriendlistService } from "../friendlist/friendlist.service";
import { UserService } from "../user/user.service";

@Injectable()
export class SeederService {
    inject: [FriendlistService, UserService]
  constructor(
    private readonly userServ: UserService,
    private readonly friendsServ: FriendlistService
  ) {}

  async seedCustom(amount: number): Promise<User[]> {
    try {
      for (let i = 1; i < amount; i++) {
        let genIntraId = randUserName();
        await this.userServ.createUser(genIntraId, "lolo");
        await this.userServ.setUser(genIntraId, {
          username: randFullName(),
          color: randColor().toString(),
          description: randParagraph()
        });
      }
      return this.userServ.getUsers();
    } catch (err: any) {
        console.log(err);
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

  async getFriendIndexes(friends: FriendList[]): Promise<number[]> {
    var indexes: number[] = [];

    for (let i = 0; i < friends.length; i++) {
        indexes.push((await this.userServ.findUserByUsername(friends[i].friendname)).index);
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
        let user: User = users[i];
        let entry = {
            "username": user.username,
            "friends": await this.friendsServ.getFriends(user.username)
        }
        ret.push(entry);
    }
    return ret;
  }

  async seedFriends() {
    try {
        const users: User[] = this.filterUsers(await this.userServ.getUsers());
        console.log("users: ", users);
        const maxFriends: number = users.length - 1;

        // loop trough users
        for (let i = 0; i < users.length; i++) {
            var user: User = users[i];
            var currentFriends: FriendList[] = await this.friendsServ.getFriends(user.username);
            var targetAmount: number = this.randomNum(1, maxFriends);
            var excludeList: number[] = await this.getFriendIndexes(currentFriends);

            excludeList.push(user.index);
            // if not target amount of friends, add friends until target
            if (currentFriends.length < targetAmount) {
                for (let i = currentFriends.length; i <= targetAmount; i++) {
                    let randomIndex: number;
                    let newFriend: User;

                    // get random number which is not in exlude list
                    while (excludeList.includes((randomIndex = this.randomNum(0, users.length)))) {}
                    newFriend = await this.userServ.findUserByUsername(users[randomIndex].username);
                    // get username of random index
                    // add new friend to friends && exclude list
                    let query = {
                        "username": user.username,
                        "friendname": newFriend.username
                    }
                    this.friendsServ.addFriend(query);
                    excludeList.push(newFriend.index);
                }
            }
        }
        return this.formulateResponse(users);
    } catch (err) {
        console.log(err);
        throw errorHandler(
            err,
            "Failed to seed database",
            HttpStatus.INTERNAL_SERVER_ERROR
          );
    }
  }
}
