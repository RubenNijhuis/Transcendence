import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Get,
  Post
} from "@nestjs/common";
import { MakeAdminDto } from "src/dtos/group/make-admin.dto";
import { EditMembersDto } from "src/dtos/group/edit-members.dto";
import { GroupService } from "src/services/group/group.service";
import { CreateGroupDto } from "../../dtos/group/create-group.dto";
import { CreatePasswordDto } from "../../dtos/group/create-password.dto";
import { EditPasswordDto } from "../../dtos/group/edit-password.dto";
import { errorHandler } from "src/utils/errorhandler/errorHandler";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllMessages() {
    return await this.groupService.getAllMessages();
  }

  @Post("createPassword")
  @UsePipes(ValidationPipe)
  async createPassword(@Body() CreatePasswordDto: CreatePasswordDto) {
    try {
      await this.groupService.createPassword(CreatePasswordDto);
      const ret = { message: "Password set! :D" };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post("updatePassword")
  @UsePipes(ValidationPipe)
  async updatePassword(@Body() editPasswordDto: EditPasswordDto) {
    try {
      await this.groupService.updatePassword(editPasswordDto);
      const ret = { message: "Password updated! :D" };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post("createGroup")
  async createGroup(@Body() createGroupDto: CreateGroupDto) {
    try {
      const group = await this.groupService.createGroup(createGroupDto);
      const groupId = group.id;
      const users = createGroupDto.users;
      const EditMembersDto = { groupId, users };
      await this.groupService.addMembers(EditMembersDto);
      const owner = createGroupDto.owner;
      const addOwnerDto = { groupId, owner };
      await this.groupService.addOwner(addOwnerDto);
      const ret = { message: "Group created with id: " + group.id };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  // @Post("removeGroup")
  // async removeGroup(@Body() removeGroupDto: removeGroupDto)
  //   try {

  //   }

  @Post("addMembers")
  async addMembers(@Body() EditMembersDto: EditMembersDto) {
    try {
      await this.groupService.addMembers(EditMembersDto);
      const ret = { message: "members added " };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post("removeMembers")
  async removeMembers(@Body() EditMembersDto: EditMembersDto) {
    try {
      await this.groupService.removeMembers(EditMembersDto);
      const ret = { message: "members removed " };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post("makeAdmin")
  async makeAdmin(@Body() MakeAdminDto: MakeAdminDto) {
    try {
      const admin = await this.groupService.makeAdmin(MakeAdminDto);
      const ret = { message: "user " + admin.userId + " is now admin" };
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post("removeAdmin")
  async unMakeAdmin(@Body() MakeAdminDto: MakeAdminDto) {
    try {
      const admin = await this.groupService.unMakeAdmin(MakeAdminDto);
      const ret = { message: "user " + admin.userId + " is no longer admin" };
      return ret;
    } catch (error) {
      throw error;
    }
  }
}
