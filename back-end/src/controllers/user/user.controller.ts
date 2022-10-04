// basic nest functionallity
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

// route config
import UserRoutes from "src/configs/routes/globalRoutes.config";

// dtos
import { UsernameDto } from "src/dtos/auth/username.dto";
import { SetTfaDto } from "src/dtos/auth/setTfa.dto";
import { SetUserDto } from "src/dtos/user/set-user.dto";
import { SeederAmountDto } from "src/dtos/seeder/custom-seeder.dto";

// user functionalities
import { UserService } from "src/services/user/user.service";

// seeding config
import { seederConfig } from "src/configs/seeder/seeder.config";

// seeding entity
import { UserSeeder } from "src/database/seeds/user-create.seed";

// user entity
import User from "../../entities/user/user.entity";

// image upload pipe config
import { bannerStorage, imgFilter, profileStorage } from "src/middleware/imgUpload/imgUpload";

// file upload library
import { MyNewFileInterceptor } from "src/middleware/imgUpload/file-interceptor";
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { Request } from "express";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

/**
 * The user controller will act as the first entry point for user related api calls.
 *
 * The user api functionality contains:
 * - getting all users or a specified user
 * - creating and removing a specified user
 * - enabling 2fa                               <--- should be moved to the 2fa controller?
 * - setting the banner/profile picture
 * - seeding the database with random users
 */

/**
 * ATTENTION
 * - upload route is wip
 * TO DO
 * - standarize uploading images
 */

@Controller(UserRoutes.prefix)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(UserRoutes.getUserOnName)
  findUsersById(@Res() res: Response, username: string) {
    try {
      return this.userService.findUserByUsername(username);
    } catch (error) {
      res.status;
    }
  }

  @Post(UserRoutes.setUser)
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async setUser(
    @Req() req: Request,
    @Body() SetUserDto: SetUserDto
  ): Promise<any> {
    try {
      const intraID = req.user["intraID"];

      return await this.userService.setUser(intraID, SetUserDto);
    } catch (err) {
      console.log("controller, setUser(): ", err);
      throw err;
    }
  }

  @Post(UserRoutes.remove)
  @UsePipes(ValidationPipe)
  @UseGuards(Jwt2faStrategy)
  async removeUser(@Req() req: Request, @Body() dto: UsernameDto) {
    try {
      const username = req.user;
      console.log("CHECK RETURN OF USER JWT: ", username);
      const ret = await this.userService.removeUser(dto.username);
      return ret;
    } catch (error) {
      throw error;
    }
  }

  @Post(UserRoutes.enableTfa)
  @UsePipes(ValidationPipe) //what does this do
  async turnon2fa(@Body() dto: SetTfaDto) {
    // const isCodeValid = this.userService.isTwoFactorAuthenticationCodeValid(twoFaDto);
    // if (!isCodeValid) {
    //     throw new UnauthorizedException('Wrong authentication code');
    // }
    try {
      await this.userService.setTfaOption(dto.username, dto.option);
    } catch (error) {
      throw error;
    }
  }

  @Post(UserRoutes.uploadBannerPic)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imgFilter,
      storage: bannerStorage,
    }),
  )
  async uploadBannerFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.filename);
    return HttpStatus.OK;
  }

  @Post(UserRoutes.uploadProfilePic)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imgFilter,
      storage: profileStorage,
    }),
  )
  async uploadProfileFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file.filename);
    return HttpStatus.OK;
  }

  @Get(UserRoutes.seed)
  async seedUsers() {
    const seed = new UserSeeder({ seedingSource: seederConfig });
    await seed.run();
  }

  @Post(UserRoutes.seedAmount)
  async seedUsersAmount(@Body() dto: SeederAmountDto) {
    console.log("YEEY I AM BEING CALLED");
    return await this.userService.seedCustom(dto.amount);
  }
}
