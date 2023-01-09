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
@UsePipes(ValidationPipe)
@UseGuards(AccessTokenGuard)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly recordService: RecordService
  ) {}

  ////////////////////////////////////////////////////////

  // PREFIX MAKEN VOOR PARAMETER CALLS
  @Get("")
  async getAll(): Promise<any> {
    try {
      return await this.groupService.getGroups();
    } catch (err) {
      throw err;
    }
  }

  @Get("groups/:groupId")
  async getGroup(@Param("groupId") groupId: string): Promise<any> {
    try {
      return await this.groupService.getGroup(groupId);
    } catch (err) {
      throw err;
    }
  }

  @Get("chats")
  async getGroupsByUserId(@Req() req: Request) {
    const profile: User = req.user["profile"];

    return await this.groupService.getGroupsByUserId(profile.uid);
  }

  @Post("setPassword")
  async setPassword(
    @Req() req: Request,
    @Body() setPasswordDto: SetPasswordDto
  ): Promise<any> {
    try {
      // Get UID through access token
      const profile = req.user["profile"];

      await this.groupService.setPassword(
        profile.uid,
        setPasswordDto.groupId,
        setPasswordDto.password
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("validatePassword")
  async validatePassword(
    @Body() validatePasswordDto: ValidatePasswordDto
  ): Promise<boolean> {
    try {
      return await this.groupService.validatePassword(
        validatePasswordDto.groupId,
        validatePasswordDto.password
      );
    } catch (err) {
      throw err;
    }
  }

  @Post("createGroup")
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto
  ) {
    try {
      // Get UID through access token
      const profile = req.user["profile"];

      const group: Group = await this.groupService.createGroup(
        profile.uid,
        createGroupDto.name,
        createGroupDto.members,
        createGroupDto.password
      );
      const groupId: string = group.uid;
      const users: string[] = createGroupDto.members;
      const owner: string = profile.uid;

      await this.groupService.addMembers(profile.uid, groupId, users);

      // TODO: why does the owner need to be set if it's done
      // in the create group service func?
      await this.groupService.setOwner(groupId, owner);

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeGroup")
  async removeGroup(
    @Req() req: Request,
    @Body() removeGroupDto: RemoveGroupDto
  ) {
    try {
      // Get UID through access token
      const profile = req.user["profile"];

      await this.groupService.removeGroup(profile.uid, removeGroupDto.groupId);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }
  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("addMembers")
  async addMembers(
    @Req() req: Request,
    @Body() editMembersDto: EditMembersDto
  ) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      // TODO: add user uid to add members func
      await this.groupService.addMembers(
        profile.uid,
        editMembersDto.groupId,
        editMembersDto.users
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeMembers")
  async removeMembers(
    @Req() req: Request,
    @Body() editMembersDto: EditMembersDto
  ) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      await this.groupService.removeMembers(
        profile.uid,
        editMembersDto.groupId,
        editMembersDto.users
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("setPermission")
  async setPermission(
    @Req() req: Request,
    @Body() setPermissionDto: SetPermissionDto
  ) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      await this.groupService.setPermission(
        profile.uid,
        setPermissionDto.groupId,
        setPermissionDto.targetUser,
        setPermissionDto.level
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("banUser")
  async banUser(@Req() req: Request, @Body() banUserDto: BanUserDto) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      await this.recordService.banUser(profile.uid, banUserDto);
      const ret = { message: "User banned!" };
      return ret;
    } catch (err) {
      throw err;
    }
  }

  @Post("unbanUser")
  async unbanUser(@Req() req: Request, @Body() unbanUserDto: UnBanUserDto) {
    try {
      // Get UID through access token
      const profile: User = req.user["profile"];

      await this.recordService.unbanUser(profile.uid, unbanUserDto);
      const ret = { message: "User unbanned!" };
      return ret;
    } catch (err) {
      throw err;
    }
  }
}
