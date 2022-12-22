// Nestjs
import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Post,
  HttpStatus,
  Param,
  UseGuards,
  Req
} from "@nestjs/common";

// Requests
import { Request } from "express";

// DTO's
import { EditOwnerDto } from "src/dtos/group";
import { SetPermissionDto } from "src/dtos/group/set-permission.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { SetPasswordDto } from "../../dtos/group/set-password.dto";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";
import { ValidatePasswordDto } from "src/dtos/group/validate-password";

// Entities
import Group from "src/entities/group/group.entity";

// Service
import { GroupService } from "src/services/group/group.service";
import { UserService } from "src/services/user/user.service";
import { MessageService } from "src/services/message/message.service";

// Guards
import { AccessTokenGuard } from "src/guards/accessToken.guard";

// Types
import User from "src/entities/user/user.entity";
import { BanUserDto } from "src/dtos/record/ban-user.dto";
import { RecordService } from "src/services/record/record.service";
import { UnBanUserDto } from "src/dtos/record/unban-user.dto";

////////////////////////////////////////////////////////////

@Controller("group")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly recordService: RecordService
  ) {}

  ////////////////////////////////////////////////////////////
  // uid - user -> [groups] (main call)
  // uid - group -> group

  // main call
  // 1. alle groups
  // per group
  // - alle messages
  // - alle users -> voledige account

  // TOE VOEGEN USERS
  // users -> range functie voor users aanvragen met [uid]

  // PREFIX MAKEN VOOR PARAMETER CALLS
  @Get("")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async getAll(): Promise<any> {
    try {
      return await this.groupService.getGroups();
    } catch (err) {
      throw err;
    }
  }

  @Get("groups/:groupId")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async getGroup(
    @Param("groupId") groupId: string,
    @Req() req: Request
  ): Promise<any> {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);
      return await this.groupService.getGroup(user.uid, groupId);
    } catch (err) {
      throw err;
    }
  }

  @Get("chats/:userId")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async getGroupsByUserId(
    @Req() req: Request,
    @Param("userId") userId: string
  ) {
    // Get UID through access token
    const intraID = req.user["intraID"];
    const user: User = await this.userService.findUserByintraId(intraID);

    if (user.uid !== userId) return HttpStatus.CONFLICT;

    return await this.groupService.getGroupsByUserId(userId);
  }

  @Post("setPassword")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async setPassword(
    @Req() req: Request,
    @Body() setPasswordDto: SetPasswordDto
  ): Promise<any> {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.groupService.setPassword(user.uid, setPasswordDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("validatePassword")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async validatePassword(
    @Body() validatePasswordDto: ValidatePasswordDto
  ): Promise<boolean> {
    try {
      return await this.groupService.validatePassword(validatePasswordDto);
    } catch (err) {
      throw err;
    }
  }

  // @Get(":uid/messages")
  // @UsePipes(ValidationPipe)
  // @UseGuards(AccessTokenGuard)
  // async getMessagesFromGroup(@Param("uid") uid: string) {
  //   try {
  //     const messagesFromGroup =
  //       await this.messageService.getAllMessagesByGroupId(uid);
  //     return messagesFromGroup;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  @Post("createGroup")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      const group: Group = await this.groupService.createGroup(
        user.uid,
        createGroupDto.name,
        createGroupDto.members,
        createGroupDto.password
      );
      const groupId: string = group.uid;
      const users: string[] = createGroupDto.members;
      const owner: string = user.uid;

      await this.groupService.addMembers(user.uid, groupId, users);

      // TODO: why does the owner need to be set if it's done
      // in the create group service func?
      await this.groupService.addOwner(groupId, owner);

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeGroup")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async removeGroup(
    @Req() req: Request,
    @Body() removeGroupDto: RemoveGroupDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.groupService.removeGroup(user.uid, removeGroupDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }
  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("addMembers")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async addMembers(
    @Req() req: Request,
    @Body() editMembersDto: EditMembersDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      // TODO: add user uid to add members func
      await this.groupService.addMembers(
        user.uid,
        editMembersDto.groupId,
        editMembersDto.users
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeMembers")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async removeMembers(
    @Req() req: Request,
    @Body() editMembersDto: EditMembersDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.groupService.removeMembers(user.uid, editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  @Post("setPermission")
  async setPermission(
    @Req() req: Request,
    @Body() setPermissionDto: SetPermissionDto
  ) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.groupService.setPermission(user.uid, setPermissionDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("banUser")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async banUser(@Req() req: Request, @Body() banUserDto: BanUserDto) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.recordService.banUser(user.uid, banUserDto);
      const ret = { message: "User banned!" };
      return ret;
    } catch (err) {
      throw err;
    }
  }

  @Post("unbanUser")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async unbanUser(@Req() req: Request, @Body() unbanUserDto: UnBanUserDto) {
    try {
      // Get UID through access token
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      await this.recordService.unbanUser(user.uid, unbanUserDto);
      const ret = { message: "User unbanned!" };
      return ret;
    } catch (err) {
      throw err;
    }
  }
}
