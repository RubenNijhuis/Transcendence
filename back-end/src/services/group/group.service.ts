import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";

import Group from "src/entities/group/group.entity";
import Groupuser from "../../entities/groupuser/groupuser.entity";
import { UserService } from "../user/user.service";
import { errorHandler } from "src/utils/errorhandler/errorHandler";

import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { EditOwnerDto } from "src/dtos/group/edit-owner.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { CreatePasswordDto } from "../../dtos/group/create-password.dto";
import { EditPasswordDto } from "../../dtos/group/edit-password.dto";
import { MuteUserDto } from "src/dtos/group/mute-user.dto";

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
    try {
      const group = await this.findGroupById(createPasswordDto.id);
      if (!group) return console.error("group doesn't exist"); //error lol
      const owner = group.owner;
      console.log(owner);
      if (owner == createPasswordDto.owner) {
        const hash1 = createHash("sha256")
          .update(createPasswordDto.password)
          .digest("hex");
        const saltOrRounds = 10;
        const password = await bcrypt.hash(hash1, saltOrRounds);
        await this.groupRepository
          .createQueryBuilder()
          .update()
          .set({ password: password })
          .where({
            id: createPasswordDto.id
          })
          .execute();
      }
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to create password",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updatePassword(editPasswordDto: EditPasswordDto) {
    try {
      const group = await this.findGroupById(editPasswordDto.id);
      if (!group) return console.error("group doesn't exist"); //error lol
      const hash = createHash("sha256")
        .update(editPasswordDto.oldPassword)
        .digest("hex");
      const isMatch: boolean = await bcrypt.compare(hash, group.password);
      if (isMatch && group.owner == editPasswordDto.owner) {
        const hash1 = createHash("sha256")
          .update(editPasswordDto.newPassword)
          .digest("hex");
        const saltOrRounds = 10;
        const password = await bcrypt.hash(hash1, saltOrRounds);
        console.log("password:", password);
        return await this.groupRepository
          .createQueryBuilder()
          .update()
          .set({ password: password })
          .where({
            id: editPasswordDto.id
          })
          .execute();
      } else {
        return console.error("error lol"); //moet kijken hoe ik errors return
      }
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to update password",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    const newGroup = this.groupRepository.create();
    newGroup.owner = createGroupDto.owner;
    newGroup.users = [];
    return this.groupRepository.save(newGroup);
  }

  async addMembers(editMembersDto: EditMembersDto) {
    try {
      const group: Group = await this.findGroupById(editMembersDto.groupId);
      for (let i = 0; i < editMembersDto.users.length; i++) {
        if (editMembersDto.users[i] == group.owner) continue;
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
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to add member to group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async addOwner(editOwnerDto: EditOwnerDto) {
    try {
      const group: Group = await this.findGroupById(editOwnerDto.groupId);
      const groupuser = this.groupuserRepository.create();
      groupuser.group = group;
      groupuser.user = await this.userService.findUsersById(editOwnerDto.owner);
      groupuser.groupId = editOwnerDto.groupId;
      groupuser.userId = editOwnerDto.owner;
      groupuser.userType = 2;
      this.groupuserRepository.save(groupuser);
      return;
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to add owner to group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeMembers(editMembersDto: EditMembersDto) {
    try {
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
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to remove users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async makeAdmin(makeAdminDto: MakeAdminDto) {
    try {
      const groupuser: Groupuser = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: makeAdminDto.group })
        .andWhere({ userId: makeAdminDto.user })
        .getOne();
      const group: Group = await this.findGroupById(makeAdminDto.group);
      console.log(groupuser.userId);
      console.log(groupuser.groupId);
      if (groupuser && group.owner === makeAdminDto.owner) {
        groupuser.userType = 1;
      }
      return this.groupuserRepository.save(groupuser);
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to make user admin",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async unMakeAdmin(MakeAdminDto: MakeAdminDto) {
    try {
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
    } catch (err: any) {
      throw errorHandler(
        err,
        "Failed to remove adminstatus from user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
