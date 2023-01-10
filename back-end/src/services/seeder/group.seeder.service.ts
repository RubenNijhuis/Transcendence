import { Injectable } from "@nestjs/common";
import { User } from "src/entities";
import { randBird } from "@ngneat/falso";
import { GroupService } from "../group/group.service";
import { UserService } from "../user/user.service";
import Group from "src/entities/group/group.entity";

@Injectable()
export class GroupseederService {
  inject: [GroupService, UserService];
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService
  ) {}

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async seedGroups() {
    try {
      const users: User[] = await this.userService.getUsers();
      const usersIds: string[] = users.map((u) => {
        return u.uid;
      });
      const passwords: string[] = ["", "ass"];

      for (let i = 0; i < users.length; i++) {
        const randoName: string = randBird();
        const filteredIds: string[] = usersIds.filter(
          (uid) => uid != users[i].uid
        );
        const seed: number = this.randomNum(0, filteredIds.length - 6);
        const members: string[] = filteredIds.slice(seed, 6 + 1);
        const num: number = this.randomNum(0, 2);
        const pass: string = passwords[num];

        // console.log("members: [", members, "]", ", pass: [", pass, "], num: ", num);
        const group: Group = await this.groupService.createGroup(
          users[i].uid,
          randoName,
          members,
          pass
        );
        await this.groupService.addMembers(users[i].uid, group.uid, members);
        await this.groupService.setOwner(group.uid, users[i].uid);
      }
    } catch (err) {
      throw err;
    }
  }
}
