import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guard/jwt.guard";
import { seederConfig } from "src/configs/seeder.config";
import { UserSeeder } from "src/database/seeds/user-create.seed";
import { twofadto } from "src/users/dtos/2fa.dto";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { MailDto } from "src/users/dtos/mail.dto";
import { UserOppDto } from "src/users/dtos/user-opp.dto";
import { UsernameDto } from "src/users/dtos/username.dto";
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

    @Post('google2fa')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async google2fa(@Body() usernameDto: UsernameDto) { 
        try {
            await this.userService.generateTwoFactorAuthenticationSecret(usernameDto);
        }
        catch (error) {
            return error;
        }
    }

    @Post('turnon2fa')
    @UsePipes(ValidationPipe) //what does this do
    async turnon2fa(@Body() Twofadto: twofadto) { 
    // const isCodeValid = this.userService.isTwoFactorAuthenticationCodeValid(Twofadto);
    // if (!isCodeValid) {
    //     throw new UnauthorizedException('Wrong authentication code');
    // }
    try {
            await this.userService.turnOn2fa(Twofadto);
        }
    catch (error) {
            return error;
        }
    }

    @Post('addGmail')
    @UsePipes(ValidationPipe)
    async addGmail(@Body() mailDto: MailDto) { 
        try {
            await this.userService.addMail(mailDto);
        }
        catch (error) {
            return error;
        }
    }


}
