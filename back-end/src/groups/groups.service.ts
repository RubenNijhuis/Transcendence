import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "src/typeorm";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { CreatePasswordDto } from "./dtos/create-password.dto";
import { EditPasswordDto } from "./dtos/edit-password.dto";
import { UsersService } from "src/users/users.service";
import { EditMembersDto } from "./dtos/edit-members.dto";
import Groupuser from "./groupusers/groupuser.entity";
import { MakeAdminDto } from "./dtos/make-admin.dto";
import { EditOwnerDto } from "./dtos/edit-owner.dto";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Groupuser)
        private readonly groupuserRepository: Repository<Groupuser>,
        private readonly userService: UsersService,
    ) {}

    getAllMessages() {
        return this.groupRepository.find();
    }

    findGroupById(id: number) {
        return this.groupRepository.findOne({ where: { id } });
    }

    async createPassword(CreatePasswordDto: CreatePasswordDto) {
        const group = await this.findGroupById(CreatePasswordDto.id);
        if (!group) return console.error("group doesn't exist");
        const owner = group.owner;
        if (owner === CreatePasswordDto.owner)
            this.groupRepository.update(
                CreatePasswordDto.id,
                CreatePasswordDto
            );
    }

    async updatePassword(EditPasswordDto: EditPasswordDto) {
        const group = await this.findGroupById(EditPasswordDto.id);
        if (!group) return console.error("group doesn't exist"); //error lmao
        const owner = group.owner;
        const oldPassword = group.password;
        if (
            owner == EditPasswordDto.owner &&
            oldPassword === EditPasswordDto.oldPassword
        )
            return this.groupRepository
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
        return this.groupRepository.save(newGroup);
    }

    async addMembers(EditMembersDto: EditMembersDto) {
        const group : Group = await this.findGroupById(EditMembersDto.groupId);
        for (let i = 0; i < EditMembersDto.users.length; i++) {
            const groupuser = this.groupuserRepository.create();
            groupuser.group = group;
            groupuser.user = await this.userService.findUsersById(EditMembersDto.users[i]);
            groupuser.groupId = EditMembersDto.groupId;
            groupuser.userId = EditMembersDto.users[i];
            groupuser.userType = 0;
            this.groupuserRepository.save(groupuser);
        }
        return ;
    }

    async addOwner(EditOwnerDto: EditOwnerDto)
    {
        const group : Group = await this.findGroupById(EditOwnerDto.groupId);
        const groupuser = this.groupuserRepository.create();
            groupuser.group = group;
            groupuser.user = await this.userService.findUsersById(EditOwnerDto.owner);
            groupuser.groupId = EditOwnerDto.groupId;
            groupuser.userId = EditOwnerDto.owner;
            groupuser.userType = 2;
            this.groupuserRepository.save(groupuser);
            return ;
    }

    async removeMembers(EditMembersDto: EditMembersDto) {
        for (let i = 0; i < EditMembersDto.users.length; i++) {
            const userToRemove: Groupuser = await this.groupuserRepository
                .createQueryBuilder("groupuser")
                .where({ groupId: EditMembersDto.groupId })
                .andWhere({ userId: EditMembersDto.users[i] })
                .getOne();
            if (userToRemove) {
                this.groupuserRepository.delete(userToRemove);
            }
        }
        return ;
    }

    async makeAdmin(MakeAdminDto: MakeAdminDto) {
        const groupuser: Groupuser =  await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: MakeAdminDto.group })
        .andWhere({ userId: MakeAdminDto.user })
        .getOne();
        const group: Group = await this.findGroupById(MakeAdminDto.group);
        console.log(groupuser.userId);
        console.log(groupuser.groupId);
        if (groupuser && group.owner === MakeAdminDto.owner) {
                groupuser.userType = 1;
        }
        return this.groupuserRepository.save(groupuser);
    }

    async unMakeAdmin(MakeAdminDto: MakeAdminDto) {
        const groupuser: Groupuser =  await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: MakeAdminDto.group })
        .andWhere({ userId: MakeAdminDto.user })
        .getOne();
        const group: Group = await this.findGroupById(MakeAdminDto.group);
        if (groupuser && group.owner === MakeAdminDto.owner) {
                groupuser.userType = 0;
        }
        return this.groupuserRepository.save(groupuser);
    }
}
