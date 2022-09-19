import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAdminDto, EditGroupDto } from "src/dtos/chat";
import Group from "src/entities/group/group.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "../../dtos/chat/create-group.dto";
import { CreatePasswordDto } from "../../dtos/chat/create-password.dto";
import { EditPasswordDto } from "../../dtos/chat/edit-password.dto";
import Groupuser from "../../entities/groupuser/groupuser.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>,
        @InjectRepository(Groupuser)
        private readonly groupuserRepository: Repository<Groupuser>,
        private readonly userService: UserService,
    ) {}

    getAllMessages() {
        return this.groupRepository.find();
    }

    findGroupById(id: number) {
        return this.groupRepository.findOne({ where: { id } });
    }

    async createPassword(createPasswordDto: CreatePasswordDto) {
        const group = this.findGroupById(createPasswordDto.id);
        if (!group) return console.error("group doesn't exist");
        const owner = (await group).owner;
        if (owner === createPasswordDto.owner)
            await this.groupRepository.update(
                createPasswordDto.id,
                createPasswordDto
            );
    }

    async updatePassword(editPasswordDto: EditPasswordDto) {
        const group = await this.findGroupById(editPasswordDto.id);
        if (!group) return console.error("group doesn't exist"); //error lmao
        const owner = group.owner;
        const oldPassword = group.password;
        if (
            owner === editPasswordDto.owner &&
            oldPassword === editPasswordDto.oldPassword
        )
            return await this.groupRepository
                .createQueryBuilder()
                .update()
                .set({ password: editPasswordDto.newPassword })
                .where({
                    id: editPasswordDto.id
                })
                .execute();
    }

    async createGroup(createGroupDto: CreateGroupDto) {
        const newGroup = this.groupRepository.create();
        newGroup.owner = createGroupDto.owner;
        newGroup.users = [];
        return this.groupRepository.save(newGroup);
    }

    async addMembers(editGroupDto: EditGroupDto) {
        for (let i = 0; i < editGroupDto.users.length; i++) {
            const groupuser = this.groupuserRepository.create();
            groupuser.group = await this.findGroupById(editGroupDto.groupId);
            groupuser.user = await this.userService.findUsersById(editGroupDto.users[i]);
            groupuser.groupId = editGroupDto.groupId;
            groupuser.userId = editGroupDto.users[i];
            groupuser.userType = 0;
            this.groupuserRepository.save(groupuser);
        }
        return ;
    }

    async removeMembers(editGroupDto: EditGroupDto) {
        for (let i = 0; i < editGroupDto.users.length; i++) {
            const userToRemove: Groupuser = await this.groupuserRepository
                .createQueryBuilder("groupuser")
                .where({ groupId: editGroupDto.groupId })
                .andWhere({ userId: editGroupDto.users[i] })
                .getOne();
            if (userToRemove) {
                this.groupuserRepository.delete(userToRemove);
            }
        }
        return ;
    }

    async makeAdmin(createAdminDto: CreateAdminDto) {
        const groupuser: Groupuser =  await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: createAdminDto.group })
        .andWhere({ userId: createAdminDto.user })
        .getOne();
        const group: Group = await this.findGroupById(createAdminDto.group);
        console.log(groupuser.userId);
        console.log(groupuser.groupId);
        if (groupuser && group.owner === createAdminDto.owner) {
                console.log("Bingo");
                groupuser.userType = 1;
        }
        console.log("2");
        return this.groupuserRepository.save(groupuser);
    }

    async unMakeAdmin(createAdminDto: CreateAdminDto) {
        const groupuser: Groupuser =  await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: createAdminDto.group })
        .andWhere({ userId: createAdminDto.user })
        .getOne();
        const group: Group = await this.findGroupById(createAdminDto.group);
        if (groupuser && group.owner === createAdminDto.owner) {
                groupuser.userType = 0;
        }
        return this.groupuserRepository.save(groupuser);
    }
}
