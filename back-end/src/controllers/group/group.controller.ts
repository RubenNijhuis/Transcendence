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
import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { SetPasswordDto } from "../../dtos/group/set-password";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";

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
  async getAllMessages() {
    return await this.groupService.getAllMessages();
  }

  @Get(":userId")
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

  // TODO: get password from body
  // TODO: make post request
  @Get("validatePassword")
  async validatePassword(
    @Body() setPasswordDto: SetPasswordDto
  ): Promise<boolean> {
    try {
      return await this.groupService.validatePassword(setPasswordDto);
    } catch (err) {
      throw err;
    }
  }

  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("createGroup")
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    try {
      const group: Group = await this.groupService.createGroup(createGroupDto);
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
      await this.groupService.addMembers(EditMembersDto);

      const addOwnerDto: EditOwnerDto = { groupId, owner };
      await this.groupService.addOwner(addOwnerDto);

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("removeGroup")
  async removeGroup(@Body() removeGroupDto: RemoveGroupDto) {
    try {
      await this.groupService.removeGroup(removeGroupDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }
  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("addMembers")
  async addMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.addMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("removeMembers")
  async removeMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.removeMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  // makeAdmin and removeAdmin should be a setpermissions route
  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("makeAdmin")
  async makeAdmin(@Body() makeAdminDto: MakeAdminDto) {
    try {
      await this.groupService.makeAdmin(makeAdminDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  // TODO: when with access token the uid can be taken from that no need to bring it with the dto
  @Post("removeAdmin")
  async unMakeAdmin(@Body() makeAdminDto: MakeAdminDto) {
    try {
      await this.groupService.unMakeAdmin(makeAdminDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }
}
