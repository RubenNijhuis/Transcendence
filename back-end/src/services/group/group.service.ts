import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { EditOwnerDto } from "src/dtos/group/edit-owner.dto";
import Group from "src/entities/group/group.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { CreatePasswordDto } from "../../dtos/group/create-password.dto";
import { EditPasswordDto } from "../../dtos/group/edit-password.dto";
import Groupuser from "../../entities/groupuser/groupuser.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Groupuser)
    private readonly groupuserRepository: Repository<Groupuser>,
    private readonly userService: UserService
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

  async addMembers(editMembersDto: EditMembersDto) {
    const group: Group = await this.findGroupById(editMembersDto.groupId);
    for (let i = 0; i < editMembersDto.users.length; i++) {
      const groupuser = this.groupuserRepository.create();
      groupuser.group = group;
      groupuser.user = await this.userService.findUsersById(
        editMembersDto.users[i]
      );
      groupuser.groupId = editMembersDto.groupId;
      groupuser.userId = editMembersDto.users[i];
      groupuser.userType = 0;
      this.groupuserRepository.save(groupuser);
    }
    return;
  }

  async addOwner(editOwnerDto: EditOwnerDto) {
    const group: Group = await this.findGroupById(editOwnerDto.groupId);
    const groupuser = this.groupuserRepository.create();
    groupuser.group = group;
    groupuser.user = await this.userService.findUsersById(editOwnerDto.owner);
    groupuser.groupId = editOwnerDto.groupId;
    groupuser.userId = editOwnerDto.owner;
    groupuser.userType = 2;
    this.groupuserRepository.save(groupuser);
    return;
  }

  async removeMembers(editMembersDto: EditMembersDto) {
    for (let i = 0; i < editMembersDto.users.length; i++) {
      const userToRemove: Groupuser = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: editMembersDto.groupId })
        .andWhere({ userId: editMembersDto.users[i] })
        .getOne();
      if (userToRemove) {
        this.groupuserRepository.delete(userToRemove);
      }
    }
    return;
  }

  async makeAdmin(MakeAdminDto: MakeAdminDto) {
    const groupuser: Groupuser = await this.groupuserRepository
      .createQueryBuilder("groupuser")
      .where({ groupId: MakeAdminDto.group })
      .andWhere({ userId: MakeAdminDto.user })
      .getOne();
    const group: Group = await this.findGroupById(MakeAdminDto.group);
    console.log(groupuser.userId);
    console.log(groupuser.groupId);
    if (groupuser && group.owner === MakeAdminDto.owner) {
      console.log("Bingo");
      groupuser.userType = 1;
    }
    console.log("2");
    return this.groupuserRepository.save(groupuser);
  }

  async unMakeAdmin(MakeAdminDto: MakeAdminDto) {
    const groupuser: Groupuser = await this.groupuserRepository
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
