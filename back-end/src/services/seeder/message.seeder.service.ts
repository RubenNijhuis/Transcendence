import { Injectable } from "@nestjs/common";
import { User } from "src/entities";
import {
    randBird,
  } from "@ngneat/falso";
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
        private readonly groupServ: GroupService,
        private readonly messageServ: MessageService,
        private readonly userServ: UserService,
    ) {}

    private randomNum(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    async seedMessages() {
        try {
            // const users: User[] = await this.userServ.getUsers();
            // const usersIds: string[] = users.map((u) => { return u.uid; });
            const groups: Group[] = await this.groupServ.getGroups();

            for (var i = 0; i < groups.length; i++) {
                const members: GroupUser[] = groups[i].users;

                for (let j = 0; j < members.length; j++) {
                    const message: CreateMessageDto = {
                        group_id: groups[i].uid,
                        content: "lol",
                        content_type: 0
                    }                        
                    await this.messageServ.createMessage(members[j].memberId, message);
                }
            }
        } catch (err) {
            throw err;
        }
    }
}