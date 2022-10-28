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
import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { GroupService } from "src/services/group/group.service";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { CreatePasswordDto } from "../../dtos/group/create-password.dto";
import { EditPasswordDto } from "../../dtos/group/edit-password.dto";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import Group from "src/entities/group/group.entity";
import { EditOwnerDto } from "src/dtos/group";
import { RemoveGroupDto } from "src/dtos/group/remove-group.dto";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllMessages() {
    return await this.groupService.getAllMessages();
  }

  @Get(":userId")
  async getGroupsByUserId(@Param('userId') userId: string) {
    return await this.groupService.getGroupsByUserId(userId);
  }

  @Post("createPassword")
  @UsePipes(ValidationPipe)
  async createPassword(@Body() createPasswordDto: CreatePasswordDto) {
    try {
      await this.groupService.createPassword(createPasswordDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("updatePassword")
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() editPasswordDto: EditPasswordDto) {
    try {
      await this.groupService.updatePassword(editPasswordDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("createGroup")
  async createGroup(@Body() createGroupDto: CreateGroupDto) { 
    try {
      const group : Group = await this.groupService.createGroup(createGroupDto);
      const groupId : number = group.id;
      const users : string[] = createGroupDto.users;
      const owner : string = createGroupDto.owner
      const EditMembersDto : EditMembersDto = { groupId, users, owner };
      await this.groupService.addMembers(EditMembersDto);
      const addOwnerDto : EditOwnerDto = { groupId, owner };
      await this.groupService.addOwner(addOwnerDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("removeGroup")
  async removeGroup(@Body() removeGroupDto: RemoveGroupDto) {
    try {
      await this.groupService.removeGroup(removeGroupDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("addMembers")
  async addMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.addMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("removeMembers")
  async removeMembers(@Body() editMembersDto: EditMembersDto) {
    try {
      await this.groupService.removeMembers(editMembersDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("makeAdmin")
  async makeAdmin(@Body() makeAdminDto: MakeAdminDto) {
    try {
      await this.groupService.makeAdmin(makeAdminDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }

  @Post("removeAdmin")
  async unMakeAdmin(@Body() makeAdminDto: MakeAdminDto) {
    try {
      await this.groupService.unMakeAdmin(makeAdminDto);
      return HttpStatus.OK;
    } catch (error) {
      throw error;
    }
  }
}
