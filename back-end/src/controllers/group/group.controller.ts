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

import { Request } from "express";

// DTO's
import { EditOwnerDto } from "src/dtos/group";
import { SetPermissionDto } from "src/dtos/group/set-permission.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { SetPasswordDto } from "../../dtos/group/set-password";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";
import { ValidatePasswordDto } from "src/dtos/group/validate-password";

// Entities
import Group from "src/entities/group/group.entity";

// Service
import { GroupService } from "src/services/group/group.service";

// Error handling
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { UserService } from "src/services/user/user.service";
import User from "src/entities/user/user.entity";

////////////////////////////////////////////////////////////

@Controller("group")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly userService: UserService
  ) {}

  ////////////////////////////////////////////////////////////

  @Get()
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async getAllMessages() {
    return await this.groupService.getAllMessages();
  }

  @Get(":userId")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async getGroupsByUserId(@Param("userId") userId: string) {
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
        createGroupDto
      );
      const groupId: number = group.id;
      const users: string[] = createGroupDto.users;
      const owner: string = createGroupDto.owner;

      if (createGroupDto.password !== null) {
        await this.groupService.setPassword(createGroupDto.owner, {
          id: group.id,
          password: createGroupDto.password
        });
      }

      const EditMembersDto: EditMembersDto = { groupId, users, owner };
      await this.groupService.addMembers(user.uid, EditMembersDto);

      const addOwnerDto: EditOwnerDto = { groupId, owner };
      await this.groupService.addOwner(addOwnerDto);

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

      // TODO: add user uid to remove group
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
      await this.groupService.addMembers(user.uid, editMembersDto);
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

      // TODO: add user uid to remove members func
      await this.groupService.removeMembers(user.uid, editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  // TODO: make setpermissiontdo
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
}
