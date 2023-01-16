// Nestjs
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { DeleteResult, Repository } from "typeorm";

// Crypto
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";

// Entitity
import { User } from "src/entities";
import Group from "src/entities/group/group.entity";
import GroupUser from "../../entities/groupuser/groupuser.entity";
import Message from "src/entities/message/message.entity";

// Services
import { UserService } from "../user/user.service";
import { MessageService } from "../message/message.service";

// Error handler
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { GroupPermissionLevel } from "src/types/group";

////////////////////////////////////////////////////////////

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupUser)
    private readonly groupuserRepository: Repository<GroupUser>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService
  ) {}

  //////////////////////////////////////////////////////////

  // only used for debug purposes
  async getGroups(): Promise<Group[]> {
    try {
      const returnedUser: Group[] = await this.groupRepository.find();
      return Promise.resolve(returnedUser);
    } catch (err) {
      throw err;
    }
  }

  findGroupById(uid: string): Promise<Group> {
    return this.groupRepository.findOne({ where: { uid } });
  }

  async getGroup(groupId: string) {
    try {
      const group: Group = await this.findGroupById(groupId);
      const groupUsers: GroupUser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ groupId: groupId })
        .getMany();
      for (let i = 0; i < groupUsers.length; i++) {
        const member: User = await this.userService.findUserByUid(
          groupUsers[i].memberId
        );
        groupUsers[i].profile = member;
      }

      const messages: Message[] =
        await this.messageService.getAllMessagesByGroupId(groupId);
      if (messages) group.messages = messages;
      group.members = groupUsers;
      return group;
    } catch (error: any) {
      return error;
    }
  }

  async getGroupsByUserId(userId: string) {
    try {
      const groupUsers: GroupUser[] = await this.groupuserRepository
        .createQueryBuilder("groupuser")
        .where({ memberId: userId })
        .getMany();

      const groupsList: Group[] = [];

      for (const profile of groupUsers) {
        const retrievedgroup: Group = await this.getGroup(profile.groupId);
        groupsList.push(retrievedgroup);
      }

      return groupsList;
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

  async findGroupuserById(userId: string, groupId: string): Promise<GroupUser> {
    const groupuser: GroupUser = await this.groupuserRepository
      .createQueryBuilder("groupuser")
      .where({ groupId })
      .andWhere({ memberId: userId })
      .getOne();
    return groupuser;
  }

  private async hashPassword(input: string): Promise<string> {
    const hash1 = createHash("sha256").update(input).digest("hex");
    const saltOrRounds = 10;
    const password: string = await bcrypt.hash(hash1, saltOrRounds);
    return password;
  }

  async createGroup(
    owner: string,
    name: string,
    members: string[],
    password: string | null
  ) {
    try {
      for (const member of members) {
        if (!(await this.userService.findUserByUid(member)))
          throw new HttpException(
            "Invalid members",
            HttpStatus.UNPROCESSABLE_ENTITY
          );
      }

      const newGroup: Group = this.groupRepository.create();

      newGroup.owner = owner;
      newGroup.members = [];
      newGroup.name = name;
      newGroup.protected = false;

      if (password && password.length > 0) {
        newGroup.protected = true;
        newGroup.password = await this.hashPassword(password);
      }

      return this.groupRepository.save(newGroup);
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to add member to group",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removeGroup(
    owner: string,
    groupId: string
  ): Promise<DeleteResult | null> {
    try {
      const group: Group = await this.findGroupById(groupId);

      if (group.owner !== owner) return null;

      const ret = await this.groupRepository
        .createQueryBuilder("group")
        .delete()
        .where({ uid: groupId })
        .execute();

      return ret;
    } catch (error: any) {
      throw error;
    }
  }

  async addMembers(
    owner: string,
    groupId: string,
    users: string[]
  ): Promise<void> {
    try {
      const group: Group = await this.findGroupById(groupId);
      if (!group)
        throw new HttpException(
          "group does not exist",
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      if (owner !== group.owner)
        throw new HttpException("Not the owner", HttpStatus.FORBIDDEN);

      for (const member of users) {
        if (member === group.owner) continue;

        const groupuser = this.groupuserRepository.create();

        groupuser.group = group;
        groupuser.profile = await this.userService.findUserByUid(member);
        groupuser.groupId = groupId;
        groupuser.memberId = member;
        groupuser.permissions = GroupPermissionLevel.Default;

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

  async setOwner(owner: string, groupId: string) {
    try {
      const group: Group = await this.findGroupById(groupId);
      const profile: User = await this.userService.findUserByUid(owner);

      if (!group || !profile)
        throw new HttpException(
          "invalid group or profile",
          HttpStatus.UNPROCESSABLE_ENTITY
        );

      const groupuser = this.groupuserRepository.create();

      groupuser.group = group;
      groupuser.profile = profile;
      groupuser.groupId = groupId;
      groupuser.memberId = owner;
      groupuser.permissions = GroupPermissionLevel.Owner;

      return await this.groupuserRepository.save(groupuser);
    } catch (err) {
      throw err;
    }
  }

  /**
   * Checks if two passwords match
   * @param formerPassword
   * @param newPassword
   * @returns boolean
   */
  async passwordsMatch(
    formerPassword: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      const hashedFormerPassword: string = await this.hashPassword(
        formerPassword
      );
      const hashedNewPassword: string = await this.hashPassword(newPassword);

      // Get the has from the original password
      const isMatch = await bcrypt.compare(
        hashedFormerPassword,
        hashedNewPassword
      );

      return isMatch;
    } catch (err) {
      console.error(err);
    }
  }

  async setPassword(groupId: string, newPassword: string) {
    try {
      const newPasswordHashed = await this.hashPassword(newPassword);

      // Update the password in the database
      await this.groupRepository
        .createQueryBuilder()
        .update()
        .set({ password: newPasswordHashed })
        .where({
          id: groupId
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

  async validatePassword(groupId: string, password: string): Promise<boolean> {
    try {
      let isPasswordValid = false;

      const hash = createHash("sha256").update(password).digest("hex");
      const group: Group = await this.findGroupById(groupId);

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
    groupId: string,
    members: string[]
  ): Promise<void> {
    try {
      let i: number;
      let isRemovable = true;
      for (const member of members) {
        if (member === owner) {
          isRemovable = false;
        }
        this.groupuserRepository
          .createQueryBuilder("groupuser")
          .delete()
          .where({ groupId: groupId })
          .andWhere({ userId: member })
          .execute();
      }

      const size: number = await this.getGroupSize(groupId);
      if (size === i || isRemovable) {
        this.removeGroup(owner, groupId);
      }
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove users",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async setPermission(
    owner: string,
    groupId: string,
    memberId: string,
    level: GroupPermissionLevel
  ) {
    try {
      const groupuser: GroupUser = await this.groupuserRepository
        .createQueryBuilder()
        .where({ groupId })
        .andWhere({ memberId })
        .getOne();

      const group: Group = await this.findGroupById(groupId);

      if (!groupuser && group.owner !== owner) {
        throw new HttpException("forbidden", HttpStatus.FORBIDDEN);
      }
      return await this.groupuserRepository
        .createQueryBuilder()
        .update(groupuser)
        .set({ permissions: level })
        .where({ groupId })
        .andWhere({ memberId })
        .returning("*")
        .execute();
    } catch (err) {
      throw errorHandler(
        err,
        "Failed to remove adminstatus from user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async removePerson(uid: string) {
    await this.groupRepository
      .createQueryBuilder("group")
      .delete()
      .where({ owner: uid })
      .execute();
  }
}
