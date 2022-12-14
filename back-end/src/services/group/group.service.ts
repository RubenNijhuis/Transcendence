import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";

import Group from "src/entities/group/group.entity";
import GroupUser from "../../entities/groupuser/groupuser.entity";
import Message from "src/entities/message/message.entity";
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";
import { errorHandler } from "src/utils/errorhandler/errorHandler";

import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { EditOwnerDto } from "src/dtos/group/edit-owner.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { SetPasswordDto } from "../../dtos/group/set-password.dto";
import { User } from "src/entities";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";
import { ValidatePasswordDto } from "src/dtos/group/validate-password";
import { SetPermissionDto } from "src/dtos/group/set-permission.dto";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupuserRepository: Repository<GroupUser>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService
  ) {}

  findGroupById(uid: string) {
    return this.groupRepository.findOne({ where: { uid } });
  }


  async getGroup(userId: string, groupId: string) {
    try {
      const group: Group = await this.findGroupById(groupId);
      const groupUsers: GroupUser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        //.leftJoinAndSelect("groupuser.user", "user") //could be different method
        .where({ memberId: userId })
        .getMany();
      const members: User[] = [];
      for(let i = 0; i < groupUsers.length; i++)
      {
        const member: User = await this.userService.findUsersById(groupUsers[i].memberId);
        groupUsers[i].user = member;
      }
      const messages: Message[] = await this.messageService.getAllMessagesByGroupId(groupId);
      group.messages = messages;
      group.users = groupUsers;
      return group;
    } catch(error: any) {
      return error;
    }
  }

  async getGroupsByUserId(userId: string) {
    try {
      const groupUsers: GroupUser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ memberId: userId })
        .getMany();

      // Doet dit niet exact hetzlefde als de vorige code?
      let i = 0;
      const groups: Group[] = [];
      while (i < groupUsers.length) {
        const group: Group = await this.groupRepository.findOne({
          where: { uid: groupUsers[i].groupId }
        });
        groups.push(group);
        i++;
      }

      return groups;
    } catch (err) {
      return err;
    }
  }

  async getGroupSize(groupId: string) {
    try {
      const groupusers: GroupUser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: groupId })
        .getMany();

      return groupusers.length;
    } catch (error: any) {
      return error;
    }
  }

  // TODO: return type and no one liners pls
  findGroupuserById(userId: string, groupId: string) {
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

  async createGroup(owner: string, createGroupDto: CreateGroupDto) {
    try {
      for (const member of createGroupDto.users) {
        const user: User = await this.userService.findUsersByIdNoFilter(member);

        if (!user) throw console.error("user doesn't exist");

        const owner: User = await this.userService.findUsersByIdNoFilter(
          member
        );

        if (!owner) throw console.error("owner doesn't exist");
      }

      const newGroup: Group = this.groupRepository.create();

      newGroup.owner = owner;
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

  async removeGroup(owner: string, removeGroupDto: RemoveGroupDto) {
    try {
      const group: Group = await this.findGroupById(removeGroupDto.groupId);

      // This needs to be taken from access token
      if (group.owner !== owner) return;

      this.groupRepository
        .createQueryBuilder("group")
        .delete()
        .where({ id: removeGroupDto.groupId })
        .execute();
    } catch (error: any) {
      throw error;
    }
  }

  async addMembers(owner: string, editMembersDto: EditMembersDto) {
    try {
      const group: Group = await this.findGroupById(editMembersDto.groupId);
      if (owner !== group.owner) return;
      for (const member of editMembersDto.users) {
        if (member == group.owner) continue;

        const groupuser = this.groupuserRepository.create();

        groupuser.group = group;
        groupuser.user = await this.userService.findUsersByIdNoFilter(member);
        groupuser.groupId = editMembersDto.groupId;
        groupuser.memberId = member;
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

  // TODO: rename to set owner
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

  async setPassword(owner: string, setPasswordDto: SetPasswordDto) {
    try {
      // Get group from db
      const group: Group = await this.findGroupById(setPasswordDto.id);
      if (!group) return console.error("group doesn't exist"); //error lol

      /**
       * If there is already a previous password we compare the new password
       * to the former. If they match we return an error as a password
       * should always be new.
       */
      if (group.password !== null) {
        const formerPassword = group.password;
        const hashedFormerPassword: string = await this.hashPassword(
          formerPassword
        );
        const hashedPasswordFromDto: string = await this.hashPassword(
          setPasswordDto.password
        );
        // Get the has from the original password
        const isMatch = await bcrypt.compare(
          hashedFormerPassword,
          hashedPasswordFromDto
        );
        if (isMatch) return console.error("error lol");
      }

      const newPassword = await this.hashPassword(setPasswordDto.password);

      // Update the password in the database
      await this.groupRepository
        .createQueryBuilder()
        .update()
        .set({ password: newPassword })
        .where({
          id: setPasswordDto.id
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

  async validatePassword(
    validatePasswordDto: ValidatePasswordDto
  ): Promise<boolean> {
    try {
      let isPasswordValid = false;

      const hash: string = await this.hashPassword(
        validatePasswordDto.password
      );
      const group: Group = await this.findGroupById(validatePasswordDto.id);

      isPasswordValid = await bcrypt.compare(hash, group.password);

      return isPasswordValid;
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // TODO: function handles too much, needs to be split
  // E.g remove members and a cleanup function that runs after
  async removeMembers(
    owner: string,
    editMembersDto: EditMembersDto
  ): Promise<void> {
    try {
      // What is `i`?
      let i: number;
      let isRemovable = true;
      for (const member of editMembersDto.users) {
        if (member === owner) {
          isRemovable = false;
        }
        this.groupuserRepository
          .createQueryBuilder("groupuser")
          .delete()
          .where({ groupId: editMembersDto.groupId })
          .andWhere({ userId: member })
          .execute();
      }

      const size: number = await this.getGroupSize(editMembersDto.groupId);
      if (size == i || isRemovable) {
        const groupId = editMembersDto.groupId;
        const removegroupDto: RemoveGroupDto = { groupId, owner };
        this.removeGroup(owner, removegroupDto);
      }
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async setPermission(owner: string, setPermissionDto: SetPermissionDto) {
    try {
      const groupuser: GroupUser = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: setPermissionDto.group })
        .andWhere({ userId: setPermissionDto.user })
        .getOne();

      const group: Group = await this.findGroupById(setPermissionDto.group);

      if (groupuser && group.owner === owner) {
        groupuser.permissions = setPermissionDto.level;
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
