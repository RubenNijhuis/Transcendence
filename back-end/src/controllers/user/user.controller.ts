// basic nest functionallity
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express";

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

// image upload and download
import {
  bannerOptions,
  deleteFiles,
  profileOptions,
} from "src/middleware/imgUpload/imgUpload";
import { FileInterceptor } from "@nestjs/platform-express";
import { readdirSync } from "fs";


// guards
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

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

  @UseGuards(AccessTokenGuard)
  @Get(UserRoutes.getPic)
  async getImg(
    @Param("imageType") imageType: string,
    @Param("username") username: string,
    @Res() res: Response
  ) {
    try {
      const { intraId } = await this.userService.findUserByUsername(username);

      if (!intraId) throw new BadRequestException("Unable to find user");
      if (imageType !== "banner" && imageType !== "profile") {
        throw new BadRequestException("Invalid image type");
      }

      const dirname : string = `/app/upload/${imageType}/`;
      let fullPath: string = dirname;

      const files = readdirSync(dirname).filter(file => file.startsWith(`${intraId}.`));
      if (!files)
        fullPath += "standard.png"; // in case nothing has been uploaded, if it ever gets optional??
      else
        fullPath += files[0]; // always takes the first one since there should only be 1 (one) file per user
      return res.sendFile(fullPath);
    } catch (err) {
      throw err;
    }
  }

  @Get(UserRoutes.getUserOnName)
  async findUsersById(@Res() res: Response, @Param() username: string) {
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

      return this.userService.filterUser(setUserResp);
    } catch (err) {
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
  @UsePipes(ValidationPipe)
  async turnon2fa(@Body() dto: SetTfaDto) {
    try {
      await this.userService.setTfaOption(dto.username, dto.option);
    } catch (error) {
      throw error;
    }
  }

  @Post(UserRoutes.uploadBannerPic)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file", bannerOptions))
  async uploadBannerFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File) {
    const path: string = '/app/upload/banner/';
    const id: string = req.user["intraID"];

    deleteFiles(path, id, file.filename);
    return HttpStatus.OK;
  }

  @Post(UserRoutes.uploadProfilePic)
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file", profileOptions))
  async uploadProfileFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
    ) {
    // remove left over files if any
    const path: string = '/app/upload/profile/';
    const id: string = req.user["intraID"];

    deleteFiles(path, id, file.filename);
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
