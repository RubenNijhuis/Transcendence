import {
    Body,
    Controller,
    UsePipes,
    ValidationPipe,
    Delete,
    Get,
    Query,
    Param,
    Post,
    Put
} from "@nestjs/common";
import { GroupService } from "src/groups/groups.service";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { CreatePasswordDto } from "./dtos/create-password.dto";
import { EditPasswordDto } from "./dtos/edit-password.dto";
import { EditMembersDto } from "./dtos/edit-members.dto";
import { MakeAdminDto } from "./dtos/make-admin.dto";

@Controller("group")
export class GroupController {
    constructor(private readonly GroupService: GroupService) {}

    @Get()
    getAllMessages() {
        return this.GroupService.getAllMessages();
    }

    @Post("createPassword")
    @UsePipes(ValidationPipe)
    async createPassword(@Body() CreatePasswordDto: CreatePasswordDto) {
        try {
            await this.GroupService.createPassword(CreatePasswordDto);
            const ret = { message: "Password set! :D" };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("updatePassword")
    @UsePipes(ValidationPipe)
    async updatePassword(@Body() EditPasswordDto: EditPasswordDto) {
        try {
            await this.GroupService.updatePassword(EditPasswordDto);
            const ret = { message: "Password updated! :D" };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("createGroup")
    async createGroup(@Body() CreateGroupDto: CreateGroupDto) {
        try {
            const group = await this.GroupService.createGroup(CreateGroupDto);
            const groupId = group.id;
            const users = CreateGroupDto.users;
            const EditMembersDto = { groupId, users };
            await this.GroupService.addMembers(EditMembersDto);
            const owner = CreateGroupDto.owner;
            const addOwnerDto = { groupId, owner};
            await this.GroupService.addOwner(addOwnerDto);
            const ret = { message: `Group created with id: ${group.id}` };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("addMembers")
    async addMembers(@Body() EditMembersDto: EditMembersDto) {
        try {
            await this.GroupService.addMembers(EditMembersDto);
            const ret = { message: "members added " };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("removeMembers")
    async removeMembers(@Body() EditMembersDto: EditMembersDto) {
        try {
            await this.GroupService.removeMembers(EditMembersDto);
            const ret = { message: "members removed " };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("makeAdmin")
    async makeAdmin(@Body() MakeAdminDto: MakeAdminDto) {
        try {
            const admin = await this.GroupService.makeAdmin(MakeAdminDto);
            const ret = { message: "user " +  admin.userId + " is now admin"};
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("unMakeAdmin")
    async unMakeAdmin(@Body() MakeAdminDto: MakeAdminDto) {
        try {
            const admin = await this.GroupService.unMakeAdmin(MakeAdminDto);
            const ret = { message: "user " +  admin.userId + " is no longer admin"};
            return ret;
        } catch (error) {
            return error;
        }
    }
        
}
