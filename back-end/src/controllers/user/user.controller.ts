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

// dtos
import { UsernameDto } from "src/dtos/auth/username.dto";
import { SetTfaDto } from "src/dtos/auth/setTfa.dto";
import { SetUserDto } from "src/dtos/user/set-user.dto"; // TODO: is this one still used?

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
  profileOptions
} from "src/middleware/imgUpload/imgUpload";
import { FileInterceptor } from "@nestjs/platform-express";
import { readdirSync } from "fs";

// guards
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { SetDescriptionDto } from "src/dtos/user/description.dto";
import { SetcolorDto } from "src/dtos/user/color.dto";

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

@Controller("user")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get("")
  async getUsers() {
    return await this.userService.getUsers();
  }

  @UseGuards(AccessTokenGuard)
  @Get("getLeaderboard")
  async getLeaderboard() {
    return await this.userService.getUsersSortedOnElo();
  }

  @UseGuards(AccessTokenGuard)
  @Get("get-img/:imageType/:username")
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

      const dirname = `/app/upload/${imageType}/`;
      let imgPath: string = dirname;

      const files = readdirSync(dirname).filter((file) => {
        return file.startsWith(`${intraId}.`);
      });

      if (files.length === 0) {
        imgPath += "standard.png"; // in case nothing has been uploaded, if it ever gets optional?? it is 😡
      } else {
        imgPath += files[0]; // always takes the first one since there should only be 1 (one) file per user
      }

      // const imgAsBuffer = ""
      // const imgBuffer = new Buffer(imgAsBuffer, 'base64');

      /**
       * Trying to send image as base 64 so it doesn't
       * have to be handled on the front-end
       */
      return res.sendFile(imgPath);
    } catch (err) {
      throw err;
    }
  }

  @Get(":username")
  async findUsersById(@Param("username") username: string) {
    try {
      const user: User = await this.userService.findUserByUsername(username);

      return this.userService.filterUser(user);
    } catch (err) {
      throw err;
    }
  }

  @Post("setUser")
  @UsePipes(ValidationPipe)
  @UseGuards(AccessTokenGuard)
  async setUser(
    @Req() req: Request,
    @Body() SetUserDto: SetUserDto
  ): Promise<any> {
    try {
      const intraID = req.user["intraID"];
      const user: User = await this.userService.findUserByintraId(intraID);

      if (!user || user.isInitialized === true) return;

      const setUserResp = await this.userService.setUser(
        intraID,
        SetUserDto.username,
        SetUserDto.color,
        SetUserDto.description
      );

      return this.userService.filterUser(setUserResp);
    } catch (err) {
      throw err;
    }
  }

  @Post("remove")
  @UsePipes(ValidationPipe)
  @UseGuards(Jwt2faStrategy)
  async removeUser(@Req() req: Request, @Body() dto: UsernameDto) {
    try {
      const removeUserResp = await this.userService.removeUser(dto.username);

      return removeUserResp;
    } catch (err) {
      throw err;
    }
  }

  @Post("enable2fa")
  @UsePipes(ValidationPipe)
  async turnon2fa(@Body() dto: SetTfaDto) {
    try {
      await this.userService.setTfaOption(dto.uid);
    } catch (err) {
      throw err;
    }
  }

  @Post("updateDescription")
  @UsePipes(ValidationPipe)
  async updateDescription(@Body() dto: SetDescriptionDto) {
    try {
      await this.userService.setDescription(dto.username, dto.description);
    } catch (err) {
      throw err;
    }
  }

  @Post("updateColor")
  @UsePipes(ValidationPipe)
  async updateColor(@Body() dto: SetcolorDto) {
    console.log("color:", dto.color);
    try {
      await this.userService.setColor(dto.username, dto.color);
    } catch (err) {
      throw err;
    }
  }

  @Post("upload-banner-pic")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file", bannerOptions))
  async uploadBannerFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    const path = "/app/upload/banner/";
    const id: string = req.user["intraID"];

    deleteFiles(path, id, file.filename);
    return HttpStatus.OK;
  }

  @Post("upload-profile-pic")
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(FileInterceptor("file", profileOptions))
  async uploadProfileFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Remove left over files
    const path = "/app/upload/profile/";
    const id: string = req.user["intraID"];

    deleteFiles(path, id, file.filename);
    return HttpStatus.OK;
  }
}
