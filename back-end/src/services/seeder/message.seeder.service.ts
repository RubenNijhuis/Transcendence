import { Injectable } from "@nestjs/common";
import { FriendlistService } from "../friendlist/friendlist.service";
import { GroupService } from "../group/group.service";
import { UserService } from "../user/user.service";
import Group from "src/entities/group/group.entity";
import { MessageService } from "../message/message.service";
import GroupUser from "src/entities/groupuser/groupuser.entity";

@Injectable()
export class MessageseederService {
  inject: [GroupService, UserService, FriendlistService];
  constructor(
    private readonly groupService: GroupService,
    private readonly messageService: MessageService
  ) {}

  async seedMessages() {
    try {
      const groups: Group[] = await this.groupService.getGroups();

      for (const group of groups) {
        const members: GroupUser[] = group.members;

        for (const member of members) {
          await this.messageService.createMessage(
            member.memberId,
            group.uid,
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
