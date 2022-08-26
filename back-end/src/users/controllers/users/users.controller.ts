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
import { seederConfig } from "src/configs/seeder.config";
import { UserSeeder } from "src/database/seeds/user-create.seed";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
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
            const user = await this.userService.createUser(createUserDto);
            const ret = { "username": user.username };
            return ret;
        } catch (error) {
            return error;
        }
    }

    @Get('seeder')
    async seedUsers() {
        // Creates 200 users
        const seed = new UserSeeder({ seedingSource: seederConfig });
        await seed.run();
    }

    @Post('addfriend')
    @UsePipes(ValidationPipe)
    async addFriend(@Body() userOppDto: UserOppDto) {
        try {
            await this.userService.addFriend(userOppDto);
        }
        catch (error) {
            return error;
        }
    }

    @Post('addblocked')
    @UsePipes(ValidationPipe)
    async addBlocked(@Body() userOppDto: UserOppDto) {
        try {
            await this.userService.addBlocked(userOppDto);
        }
        catch (error) {
            return error;
        }
    }

    // @Get('angi')
    // angi(user: User) { return this.userService.generateTwoFactorAuthenticationSecret(user);}


}
