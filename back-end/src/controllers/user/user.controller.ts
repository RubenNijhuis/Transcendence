// Nestjs
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

// Dto's
import { UsernameDto } from "src/dtos/auth/username.dto";
import { SetTfaDto } from "src/dtos/auth/setTfa.dto";
import { SetUserDto } from "src/dtos/user/set-user.dto";

// Services
import { UserService } from "src/services/user/user.service";

// Entities
import User from "../../entities/user/user.entity";

// Image handling
import {
  bannerOptions,
  deleteFiles,
  profileOptions
} from "src/middleware/imgUpload/imgUpload";
import { FileInterceptor } from "@nestjs/platform-express";
import { readdirSync } from "fs";

// Guards
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { SetDescriptionDto } from "src/dtos/user/description.dto";
import { SetcolorDto } from "src/dtos/user/color.dto";

////////////////////////////////////////////////////////////

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
@UseGuards(AccessTokenGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  //////////////////////////////////////////////////////////

  @Get("")
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Get("getLeaderboard")
  async getLeaderboard() {
    return await this.userService.getUsersSortedOnElo();
  }

  @Get("get-img/:imageType/:username")
  async getImg(
    @Param("imageType") imageType: string,
    @Param("username") username: string,
    @Res() res: Response
  ) {
    try {
      const user = await this.userService.findUserByUsername(username);

      const uid = user.uid;

      if (!uid) throw new BadRequestException("Unable to find user");
      if (imageType !== "banner" && imageType !== "profile") {
        throw new BadRequestException("Invalid image type");
      }

      const dirname = `/app/upload/${imageType}/`;
      let imgPath = dirname;

      const files = readdirSync(dirname).filter((file) => {
        return file.startsWith(`${uid}.`);
      });

      if (files.length === 0) {
        imgPath += "standard.png";
      } else {
        /**
         * Always takes the first one since there should
         * only be 1 (one) file per user
         */
        imgPath += files[0];
      }

      /**
       * TODO: send image as base 64 buffer to back-end so
       * it doesn't have to be converted on the front-end
       **/
      // const imgAsBuffer = ""
      // const imgBuffer = new Buffer(imgAsBuffer, 'base64');
      return res.sendFile(imgPath);
    } catch (err) {
      throw err;
    }
  }

  @Get(":username")
  async findUsersById(@Param("username") username: string) {
    try {
      const user: User = await this.userService.findUserByUsername(username);

      return this.userService.filterProfile(user);
    } catch (err) {
      throw err;
    }
  }

  @Post("setUser")
  @UsePipes(ValidationPipe)
  async setUser(
    @Req() req: Request,
    @Body() setUserDto: SetUserDto
  ): Promise<any> {
    try {
      const profile: User = req.user["profile"];

      if (!profile || profile.isInitialized === true) return;

      const setUserResp = await this.userService.setUser(
        profile.intraId,
        setUserDto.username.toLowerCase(),
        setUserDto.color,
        setUserDto.description
      );

      return this.userService.filterProfile(setUserResp);
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
  @UseInterceptors(FileInterceptor("file", bannerOptions))
  async uploadBannerFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    const path = "/app/upload/banner/";
    const profile: User = req.user["profile"];

    deleteFiles(path, profile.uid, file.filename);
    return HttpStatus.OK;
  }

  @Post("upload-profile-pic")
  @UseInterceptors(FileInterceptor("file", profileOptions))
  async uploadProfileFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File
  ) {
    // Remove left over files
    const path = "/app/upload/profile/";
    const profile: User = req.user["profile"];

    deleteFiles(path, profile.uid, file.filename);
    return HttpStatus.OK;
  }
}
