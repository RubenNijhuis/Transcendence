// basic nest functionallity
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
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
import { SetUserDto } from "src/dtos/user/set-user.dto"; // TODO: is this one still used?
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
import {
  bannerOptions,
  profileOptions
} from "src/middleware/imgUpload/imgUpload";

// file upload library
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { Request, Response } from "express";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { GetImgDto } from "src/dtos/user/get-img.dto";

/**
 * The user controller will act as the first entry point for user related api calls.
 *
 * The user api functionality contains:
 * - getting all users or a specified user
 * - creating and removing a specified user
 * - setting 2fa
 * - setting the banner/profile picture
 * - seeding the database with random users
 */

@Controller(UserRoutes.prefix)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get("get-img/:imageType/:username")
  async getImg(
    @Param("imageType") imageType: string,
    @Param("username") username: string,
    @Res() res: Response
  ) {
    try {
      const { intraId } = await this.userService.findUserByUsername(username);

      console.log(imageType, username);
      //   if (!intraId) throw new Error("Bad boy is not correct type :(");
      //   if (imageType !== "banner" && imageType !== "profile") {
      //     console.log(imageType);
      //     throw new Error("Bad boy is not correct type :(");
      //   }``

      return res.sendFile(`upload/${imageType}/${intraId}.jpg`, {
        root: "/app/"
      });
    } catch (err) {
      throw err;
    }
  }

  @Get(UserRoutes.getUserOnName)
  async findUsersById(@Res() res: Response, username: string) {
    try {
      const user: User = await this.userService.findUserByUsername(username);
      return this.userService.filterUser(user);
    } catch (err) {
      throw err;
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
      const setUserResp = await this.userService.setUser(intraID, SetUserDto);

      return setUserResp;
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
      const removeUserResp = await this.userService.removeUser(dto.username);

      return removeUserResp;
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
  @UseInterceptors(FileInterceptor("file", bannerOptions))
  async uploadBannerFile(@UploadedFile() file: Express.Multer.File) {
    console.log("Upload banner file: ", file.filename);
    return HttpStatus.OK;
  }

  @Post(UserRoutes.uploadProfilePic)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file", profileOptions))
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
    const seedResp = await this.userService.seedCustom(dto.amount);
    return seedResp;
  }
}
