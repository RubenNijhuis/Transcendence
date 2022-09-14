import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group, User } from "src/typeorm";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { CreatePasswordDto } from "./dtos/create-password.dto";
import { UserNameOptions } from "@ngneat/falso/lib/user-name";
import { EditPasswordDto } from "./dtos/edit-password.dto";
import { UsersService } from "src/users/users.service";
import { UsersController } from "src/users/users.controller";
import { group } from "console";
import { EditMembersDto } from "./dtos/edit-members.dto";
import Groupuser from "./groupusers/groupuser.entity";
import { GroupuserService } from "./groupusers/groupuser.service";
import { CreateGroupuserDto } from "./groupusers/create-groupuser.dto";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        private readonly userService: UsersService,
        private readonly groupuserService: GroupuserService
    ) {}

    getAllMessages() {
        return this.groupRepository.find();
    }

    findGroupById(id: number) {
        return this.groupRepository.findOne({ where: { id } });
    }

    async createPassword(CreatePasswordDto: CreatePasswordDto) {
        const group = this.findGroupById(CreatePasswordDto.id);
        if (!group) return console.error(); //error lmao
        const owner = (await group).owner;
        if (owner === CreatePasswordDto.owner)
            await this.groupRepository.update(
                CreatePasswordDto.id,
                CreatePasswordDto
            );
    }

    async updatePassword(EditPasswordDto: EditPasswordDto) {
        const group = await this.findGroupById(EditPasswordDto.id);
        if (!group) return console.error(); //error lmao
        const owner = group.owner;
        const oldPassword = group.password;
        if (
            owner === EditPasswordDto.owner &&
            oldPassword === EditPasswordDto.oldPassword
        )
            return await this.groupRepository
                .createQueryBuilder()
                .update()
                .set({ password: EditPasswordDto.newPassword })
                .where({
                    id: EditPasswordDto.id
                })
                .execute();
    }

    async createGroup(CreateGroupDto: CreateGroupDto) {
        const newGroup = this.groupRepository.create();
        newGroup.owner = CreateGroupDto.owner;
        newGroup.users = [];
        // for (var i = 0; i < CreateGroupDto.users.length; i++) {
        //     let CreateGroupuserDto : CreateGroupuserDto;
        //     console.log("we good?")
        //     console.log(CreateGroupDto.users[i]);
        //     console.log(newGroup.id);
        //     CreateGroupuserDto.userId = CreateGroupDto.users[i];
        //     CreateGroupuserDto.groupId = newGroup.id;
        //     console.log("pre");
        //     const newGroupuser : Groupuser = await this.groupuserService.createGroupuser(CreateGroupuserDto);
        //     console.log("post");
        //     newGroup.users.push(newGroupuser);
        // }
        return this.groupRepository.save(newGroup);
    }

    async addMembers(EditMembersDto: EditMembersDto) {
        const group = await this.findGroupById(EditMembersDto.id);
        if (!group)
            console.error();
        console.log(group.owner);
        for (let i = 0; i < EditMembersDto.users.length; i++) {
            let CreateGroupuserDto : CreateGroupuserDto;
                console.log("we good?")
                console.log(EditMembersDto.users[i]);
                console.log(group.id);
                CreateGroupuserDto.user = await this.userService.findUsersById(EditMembersDto.users[i]);
                CreateGroupuserDto.group = await this.findGroupById(EditMembersDto.id);
                console.log("pre");
                const newGroupuser : Groupuser = await this.groupuserService.createGroupuser(CreateGroupuserDto);
                console.log("post");
                group.users.push(newGroupuser);
        }
        return this.groupRepository.save(group);
    }

    // async removeMembers(EditMembersDto: EditMembersDto) {
    //     const group = await this.groupRepository
    //         .createQueryBuilder("group")
    //         .where({ id: EditMembersDto.id })
    //         .leftJoinAndSelect("group.users", "user")
    //         .getOne();
        
    //     for (let i = 0; i < EditMembersDto.users.length; i++) {
    //         const userToRemove: User = await this.userService.findUsersById(
    //             EditMembersDto.users[i]
    //         );
    //         if (userToRemove) {
    //             const userID = (user : User) => user === userToRemove;
    //             group.users.splice(group.users.findIndex(userID), 1);
    //         }
    //     }
    //     return this.groupRepository.save(group);
    // }
}



// const group = await this.groupRepository
// .createQueryBuilder("group")
// .where({ id: EditMembersDto.id })
//  .leftJoinAndSelect("group.users", "user")
// .getOne();