import {
    Body,
    Controller,
    UsePipes,
    ValidationPipe,
    Get,
    Post,
} from "@nestjs/common";
import { CreateAdminDto, EditGroupDto } from "src/dtos/chat";
import { GroupService } from "src/services/group/groups.service";
import { CreateGroupDto } from "../../dtos/chat/create-group.dto";
import { CreatePasswordDto } from "../../dtos/chat/create-password.dto";
import { EditPasswordDto } from "../../dtos/chat/edit-password.dto";

@Controller("group")
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Get()
    getAllMessages() {
        return this.groupService.getAllMessages();
    }

    @Post("createPassword")
    @UsePipes(ValidationPipe)
    async createPassword(@Body() CreatePasswordDto: CreatePasswordDto) {
        try {
            await this.groupService.createPassword(CreatePasswordDto);
            const ret = { message: "Password set! :D" };
            return ret;
        } catch (error) {
            return error;
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
            return error;
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
            const ret = { message: "Group created with id: " + group.id };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("addMembers")
    async addMembers(@Body() editGroupDto: EditGroupDto) {
        try {
            await this.groupService.addMembers(editGroupDto);
            const ret = { message: "members added " };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("removeMembers")
    async removeMembers(@Body() editGroupDto: EditGroupDto) {
        try {
            await this.groupService.removeMembers(editGroupDto);
            const ret = { message: "members removed " };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("makeAdmin")
    async makeAdmin(@Body() createAdminDto: CreateAdminDto) {
        try {
            const admin = await this.groupService.makeAdmin(createAdminDto);
            const ret = { message: "user " +  admin.userId + " is now admin"};
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Post("unMakeAdmin")
    async unMakeAdmin(@Body() createAdminDto: CreateAdminDto) {
        try {
            const admin = await this.groupService.unMakeAdmin(createAdminDto);
            const ret = { message: "user " +  admin.userId + " is no longer admin"};
            return ret;
        } catch (error) {
            return error;
        }
    }
        
}
