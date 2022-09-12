import { Injectable } from "@nestjs/common";
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

@Injectable()
export class GroupService {
    // import: [UsersService]
    // inject: [UsersService]
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        private readonly userService: UsersService
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
        for (var i = 0; i < CreateGroupDto.users.length; i++) {
            const myUser: User = await this.userService.findUsersById(
                CreateGroupDto.users[i]
            );
            newGroup.users.push(myUser);
        }
        return this.groupRepository.save(newGroup);
    }

    async addMembers(EditMembersDto: EditMembersDto) {
        const group = await this.groupRepository
            .createQueryBuilder("group")
            .where({ id: EditMembersDto.id })
            .leftJoinAndSelect("group.users", "user")
            .getOne();

        for (let i = 0; i < EditMembersDto.users.length; i++) {
            const userToAdd: User = await this.userService.findUsersById(
                EditMembersDto.users[i]
            );
            if (userToAdd) {
                group.users.push(userToAdd);
                console.log("Ik ben er in");
            }
        }
        return this.groupRepository.save(group);
    }

    async removeMembers(EditMembersDto: EditMembersDto) {
        const group = await this.groupRepository
            .createQueryBuilder("group")
            .where({ id: EditMembersDto.id })
            .leftJoinAndSelect("group.users", "user")
            .getOne();
        
        for (let i = 0; i < EditMembersDto.users.length; i++) {
            const userToRemove: User = await this.userService.findUsersById(
                EditMembersDto.users[i]
            );
            if (userToRemove) {
                const userID = (user : User) => user === userToRemove;
                group.users.splice(group.users.findIndex(userID), 1);
            }
        }
        return this.groupRepository.save(group);
    }
}
