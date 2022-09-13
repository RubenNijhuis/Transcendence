import { HttpService } from "@nestjs/axios";
import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UsernameDto } from "src/auth/dto/username.dto";
import { seederConfig } from "src/configs/seeder.config";
import { UserSeeder } from "src/database/seeds/user-create.seed";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UsersService } from "src/users/users.service";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('id/:username')
    findUsersById(@Res() res: Response, username: string) {
        try {
            return this.userService.findUserByUsername(username);
        } catch (error) {
            res.status
        }
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

    @Post('turnon2fa')
    @UsePipes(ValidationPipe) //what does this do
    async turnon2fa(@Body() usernameDto: UsernameDto) { 
    // const isCodeValid = this.userService.isTwoFactorAuthenticationCodeValid(Twofadto);
    // if (!isCodeValid) {
    //     throw new UnauthorizedException('Wrong authentication code');
    // }
    try {
            await this.userService.turnOn2fa(usernameDto);
        }
    catch (error) {
            return error;
        }
    }
}
