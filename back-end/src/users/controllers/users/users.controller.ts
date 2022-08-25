import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UsersService } from "src/users/services/users/users.service";

// GET
//     / api / users /

//     GET
//     / api / users / 2

// POST
//     / api / user

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('id/:username')
    findUsersById(username: string) {
        return this.userService.findUserByUsername(username);
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async createUsers(@Body() createUserDto: CreateUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto)
            const ret = { "username": user.username }
            return ret
        } catch (error) {
            return error
        }
    }

    @Get('seeder')
    seedUsers() {
        for (var i = 0; i < 200; i++) {

        }
    }
}
