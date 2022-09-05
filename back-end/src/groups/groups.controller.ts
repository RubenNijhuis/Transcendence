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
            const ret = { message: "Group created with id: " + group.id };
            return ret;
        } catch (error) {
            return error;
        }
    }
}
