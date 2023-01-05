import { Injectable } from "@nestjs/common";
import { User } from "src/entities";
import { randBird } from "@ngneat/falso";
import { FriendlistService } from "../friendlist/friendlist.service";
import { GroupService } from "../group/group.service";
import { UserService } from "../user/user.service";
import Group from "src/entities/group/group.entity";
import { MessageService } from "../message/message.service";
import GroupUser from "src/entities/groupuser/groupuser.entity";
import { CreateMessageDto } from "src/dtos/group";

@Injectable()
export class MessageseederService {
  inject: [GroupService, UserService, FriendlistService];
  constructor(
    private readonly groupService: GroupService,
    private readonly messageService: MessageService,
    private readonly userService: UserService
  ) {}

  private randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async seedMessages() {
    try {
      const groups: Group[] = await this.groupService.getGroups();

      for (let i = 0; i < groups.length; i++) {
        const members: GroupUser[] = groups[i].members;

        for (let j = 0; j < members.length; j++) {
          await this.messageService.createMessage(
            members[j].memberId,
            groups[i].uid,
            "lol",
            0
          );
        }
      }
    } catch (err) {
      throw err;
    }
  }
}
