import { Injectable } from "@nestjs/common";
import { FriendList, User } from "src/entities";
import { randBird } from "@ngneat/falso";
import { GroupService } from "../group/group.service";
import { UserService } from "../user/user.service";
import Group from "src/entities/group/group.entity";
import { FriendlistService } from "../friendlist/friendlist.service";

@Injectable()
export class GroupseederService {
  inject: [GroupService, UserService, FriendlistService];
  constructor(
    private readonly groupService: GroupService,
    private readonly friendlistService: FriendlistService,
    private readonly userService: UserService
  ) {}

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async seedGroups() {
    try {
      const users: User[] = await this.userService.getUsers();
      const passwords: string[] = ["", "ass"];

      for (const user of users) {
        const friends: FriendList[] = await this.friendlistService.getFriends(
          user.username
        );
        const friendNames: string[] = friends.map((val) => {
          if (val.username === user.username) return val.friendname;
          else return val.username;
        });
        console.log(
          "has dupes: ",
          new Set(friendNames).size !== friendNames.length
        );
        const friendUids: string[] = (
          await this.userService.getUsersOnUsernames(friendNames)
        ).map((val) => {
          return val.uid;
        });

        const randoName: string = randBird();
        const filteredIds: string[] = friendUids;
        const seed: number = this.randomNum(0, filteredIds.length);
        const members: string[] = filteredIds.slice(0, seed);
        const num: number = this.randomNum(0, 2);
        const pass: string = passwords[num];

        const group: Group = await this.groupService.createGroup(
          user.uid,
          randoName,
          members,
          pass
        );
        await this.groupService.addMembers(user.uid, group.uid, members);
        await this.groupService.setOwner(user.uid, group.uid);
      }
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  }
}
