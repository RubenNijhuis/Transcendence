import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
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
import { User } from "src/entities";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";
import { group } from "console";

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

  async getGroupsByUserId(userId: string) {
    try {
      const Groupusers: Groupuser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({memberId: userId})
        .getMany();

      let i = 0;
      const groups: Group[] = [];
      while (i < Groupusers.length) {
        const group: Group = await this.groupRepository.findOne({
          where: { id: Groupusers[i].groupId }
        });
        groups.push(group);
        i++;
      }
      return groups;
    } catch (err) {
      return err;
    }
  }

  async getGroupSize(groupId: number) {
    try {
      const groupusers: Groupuser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: groupId })
        .getMany();
      return groupusers.length;
    } catch (error: any) {
      return error;
    }
  }

  findGroupuserById(userId: string, groupId: number) {
    return this.groupuserRepository
      .createQueryBuilder("groupuser")
      .where({ groupId })
      .andWhere({ memberId: userId })
      .getOne();
  }

  async hashPassword(input: string) {
    const hash1 = createHash("sha256").update(input).digest("hex");
    const saltOrRounds = 10;
    const password: string = await bcrypt.hash(hash1, saltOrRounds);
    return password;
  }

  async createGroup(createGroupDto: CreateGroupDto) {
    try {
      for (let i = 0; i < createGroupDto.users.length; i++) {
        const user: User = await this.userService.findUsersByIdNoFilter(
          createGroupDto.users[i]
        );

        if (!user) throw console.error("user doesn't exist");

        const owner: User = await this.userService.findUsersByIdNoFilter(
          createGroupDto.owner
        );

        if (!owner) throw console.error("owner doesn't exist");
      }

      const newGroup: Group = this.groupRepository.create();

      newGroup.owner = createGroupDto.owner;
      newGroup.users = [];
      newGroup.name = createGroupDto.name;
      newGroup.protected = false;

      return this.groupRepository.save(newGroup);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to add member to group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeGroup(removeGroupDto: RemoveGroupDto) {
    try {
      const group: Group = await this.findGroupById(removeGroupDto.groupId);

      if (group.owner !== removeGroupDto.owner) return;

      this.groupRepository
        .createQueryBuilder("group")
        .delete()
        .where({ id: removeGroupDto.groupId })
        .execute();
    } catch (error: any) {
      throw error;
    }
  }

  async addMembers(editMembersDto: EditMembersDto) {
    try {
      const group: Group = await this.findGroupById(editMembersDto.groupId);

      for (let i = 0; i < editMembersDto.users.length; i++) {
        if (editMembersDto.users[i] == group.owner) continue;

        const groupuser = this.groupuserRepository.create();

        groupuser.group = group;
        groupuser.user = await this.userService.findUsersByIdNoFilter(
          editMembersDto.users[i]
        );
        groupuser.groupId = editMembersDto.groupId;
        groupuser.memberId = editMembersDto.users[i];
        groupuser.permissions = 0;
        this.groupuserRepository.save(groupuser);
      }
    } catch (err) {
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
      groupuser.user = await this.userService.findUsersByIdNoFilter(
        editOwnerDto.owner
      );
      groupuser.groupId = editOwnerDto.groupId;
      groupuser.memberId = editOwnerDto.owner;
      groupuser.permissions = 2;

      return this.groupuserRepository.save(groupuser);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to add owner to group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createPassword(createPasswordDto: CreatePasswordDto) {
    try {
      const group: Group = await this.findGroupById(createPasswordDto.id);
      if (!group) throw console.error("group doesn't exist"); //error lol

      const owner: string = group.owner;
      console.log(owner);

      if (owner !== createPasswordDto.owner)
        return console.error("owner doesn't match");

      const password: string = await this.hashPassword(
        createPasswordDto.password
      );

      await this.groupRepository
        .createQueryBuilder()
        .update()
        .set({ password: password })
        .set({ protected: true})
        .where({
          id: createPasswordDto.id
        })
        .execute();
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to create password",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updatePassword(editPasswordDto: EditPasswordDto) {
    try {
      const group: Group = await this.findGroupById(editPasswordDto.id);
      if (!group) return console.error("group doesn't exist"); //error lol

      const oldHash: string = await this.hashPassword(
        editPasswordDto.oldPassword
      );
      const isMatch: boolean = await bcrypt.compare(oldHash, group.password);

      if (!isMatch && group.owner === editPasswordDto.owner)
        return console.error("error lol");
      const newHash: string = await this.hashPassword(
        editPasswordDto.oldPassword
      );

      await this.groupRepository
        .createQueryBuilder()
        .update()
        .set({ password: newHash })
        .where({
          id: editPasswordDto.id
        })
        .execute();
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to update password",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validatePassword(password: string, groupId: number) {
    try {
      const hash: string = await this.hashPassword(password);
      const group: Group = await this.findGroupById(groupId);
      return await bcrypt.compare(hash, group.password);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeMembers(editMembersDto: EditMembersDto) {
    //TODO: need to add check if owner is actually the owner
    let i: number;
    let ownerRemoved: boolean = false;
    try {
      for (i = 0; i < editMembersDto.users.length; i++) {
        if (editMembersDto.users[i] === editMembersDto.owner) {
          ownerRemoved = true;
        }
        this.groupuserRepository
          .createQueryBuilder("groupuser")
          .delete()
          .where({ groupId: editMembersDto.groupId })
          .andWhere({ userId: editMembersDto.users[i] })
          .execute();
      }
      const size: number = await this.getGroupSize(editMembersDto.groupId);
      if (size == i || ownerRemoved) {
        const groupId = editMembersDto.groupId;
        const owner = editMembersDto.owner;
        const removegroupDto: RemoveGroupDto = { groupId, owner };
        this.removeGroup(removegroupDto);
      }
    } catch (err) {
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
      if (groupuser && group.owner === makeAdminDto.owner) {
        groupuser.permissions = 1;
      }
      return this.groupuserRepository.save(groupuser);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to make user admin",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async unMakeAdmin(makeAdminDto: MakeAdminDto) {
    try {
      const groupuser: Groupuser = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: makeAdminDto.group })
        .andWhere({ userId: makeAdminDto.user })
        .getOne();
      const group: Group = await this.findGroupById(makeAdminDto.group);
      if (groupuser && group.owner === makeAdminDto.owner) {
        groupuser.permissions = 0;
      }
      return this.groupuserRepository.save(groupuser);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove adminstatus from user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
