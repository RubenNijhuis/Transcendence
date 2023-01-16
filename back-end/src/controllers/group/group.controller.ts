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
import User from "src/entities/user/user.entity";

// Service
import { GroupService } from "src/services/group/group.service";
import { RecordService } from "src/services/record/record.service";

// Guards
import { AccessTokenGuard } from "src/guards/accessToken.guard";

// Dtos
import { BanUserDto } from "src/dtos/record/ban-user.dto";
import { UnBanUserDto } from "src/dtos/record/unban-user.dto";
import { MessagePermission } from "src/types/chat";

////////////////////////////////////////////////////////////

@Controller("group")
@UsePipes(ValidationPipe)
@UseGuards(AccessTokenGuard)
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly recordService: RecordService
  ) {}

  ////////////////////////////////////////////////////////

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
      const group: Group = await this.groupService.getGroup(groupId);

      // TODO: set in service
      delete group.password;
      return group;
    } catch (err) {
      throw err;
    }
  }

  @Get("chats")
  async getGroupsByUserId(@Req() req: Request) {
    const profile: User = req.user["profile"];

    const groups: Group[] = await this.groupService.getGroupsByUserId(
      profile.uid
    );

    // TODO: set in service
    for (const group of groups) {
      delete group.password;
    }

    return groups;
  }

  @Post("setPassword")
  async setPassword(
    @Req() req: Request,
    @Body() setPasswordDto: SetPasswordDto
  ): Promise<any> {
    try {
      const profile = req.user["profile"];
      const group: Group = await this.groupService.getGroup(
        setPasswordDto.groupId
      );

      if (group.owner !== profile.uid) return;

      await this.groupService.setPassword(
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
    @Req() req: Request,
    @Body() validatePasswordDto: ValidatePasswordDto
  ): Promise<boolean> {
    try {
      const profile = req.user["profile"];

      const group: Group = await this.groupService.getGroup(
        validatePasswordDto.groupId
      );

      if (!group || this.groupService.findGroupuserById(profile.uid, group.uid))
        return;

      const isCorrectPassword = await this.groupService.validatePassword(
        validatePasswordDto.groupId,
        validatePasswordDto.password
      );

      return isCorrectPassword;
    } catch (err) {
      throw err;
    }
  }

  @Post("createGroup")
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto
  ): Promise<Group> {
    try {
      const profile = req.user["profile"];

      const group: Group = await this.groupService.createGroup(
        profile.uid,
        createGroupDto.name,
        createGroupDto.members,
        createGroupDto.password
      );

      const groupId: string = group.uid;
      const users: string[] = createGroupDto.members;

      await this.groupService.addMembers(profile.uid, groupId, users);
      await this.groupService.setOwner(profile.uid, groupId);

      const createdGroup = await this.groupService.getGroup(groupId);
      delete createGroupDto.password;
      return createdGroup;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeGroup")
  @UsePipes(ValidationPipe)
  async removeGroup(
    @Req() req: Request,
    @Body() removeGroupDto: RemoveGroupDto
  ) {
    try {
      const profile = req.user["profile"];

      await this.groupService.removeGroup(profile.uid, removeGroupDto.groupId);

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("addMembers")
  async addMembers(
    @Req() req: Request,
    @Body() editMembersDto: EditMembersDto
  ) {
    try {
      const profile: User = req.user["profile"];

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
      const profile: User = req.user["profile"];

      await this.recordService.setRecord(
        profile.uid,
        banUserDto.userId,
        banUserDto.groupId,
        MessagePermission.Ban
      );
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("unbanUser")
  async unbanUser(@Req() req: Request, @Body() unbanUserDto: UnBanUserDto) {
    try {
      const profile: User = req.user["profile"];

      await this.recordService.removeBanOrMute(
        profile.uid,
        unbanUserDto.groupId,
        unbanUserDto.groupId
      );

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }
}
