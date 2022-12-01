import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Post,
  HttpStatus,
  Param
} from "@nestjs/common";

// DTO's
import { EditOwnerDto } from "src/dtos/group";
import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { CreatePasswordDto } from "../../dtos/group/create-password.dto";
import { EditPasswordDto } from "../../dtos/group/edit-password.dto";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";

// Entities
import Group from "src/entities/group/group.entity";

// Service
import { GroupService } from "src/services/group/group.service";

// Error handling
import { errorHandler } from "src/utils/errorhandler/errorHandler";

////////////////////////////////////////////////////////////

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  ////////////////////////////////////////////////////////////

  @Get()
  async getAllMessages() {
    return await this.groupService.getAllMessages();
  }

  @Get(":userId")
  async getGroupsByUserId(@Param("userId") userId: string) {
    return await this.groupService.getGroupsByUserId(userId);
  }

  @Post("createPassword")
  @UsePipes(ValidationPipe)
  async createPassword(@Body() createPasswordDto: CreatePasswordDto) {
    try {
      await this.groupService.createPassword(createPasswordDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("updatePassword")
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() editPasswordDto: EditPasswordDto) {
    try {
      await this.groupService.updatePassword(editPasswordDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Get("validatepassword/:groupid/:password")
  async validatePassword(
    @Param("password") password: string,
    @Param("groupid") groupId: number
  ): Promise<boolean> {
    try {
      return await this.groupService.validatePassword(password, groupId);
    } catch (err) {
      throw err;
    }
  }

  @Post("createGroup")
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    try {
      const group: Group = await this.groupService.createGroup(createGroupDto);
      const groupId: number = group.id;
      const users: string[] = createGroupDto.users;
      const owner: string = createGroupDto.owner;

      const EditMembersDto: EditMembersDto = { groupId, users, owner };

      await this.groupService.addMembers(EditMembersDto);

      const addOwnerDto: EditOwnerDto = { groupId, owner };

      await this.groupService.addOwner(addOwnerDto);

      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeGroup")
  async removeGroup(@Body() removeGroupDto: RemoveGroupDto) {
    try {
      await this.groupService.removeGroup(removeGroupDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("addMembers")
  async addMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.addMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeMembers")
  async removeMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.removeMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

  @Post("makeAdmin")
  async makeAdmin(@Body() makeAdminDto: MakeAdminDto) {
    try {
      await this.groupService.makeAdmin(makeAdminDto);
      return HttpStatus.OK;
    } catch (err) {
      throw err;
    }
  }

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
