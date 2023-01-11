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
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express";

// Dto's
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
import { createReadStream, readdirSync } from "fs";

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

  @Get("img/:imageType/:username")
  async returnImg(
    @Res({ passthrough: true }) res: Response,
    @Param("imageType") imageType: string,
    @Param("username") username: string
  ): Promise<StreamableFile> {
    if (imageType !== "banner" && imageType !== "profile") {
      throw new BadRequestException("Invalid image type");
    }

    const user = await this.userService.findUserByUsername(username);

    if (!user || user.isInitialized === false)
      throw new BadRequestException("Unable to find user");

    const dirname = `/app/upload/${imageType}/`;
    let imgPath = dirname;

    const files = readdirSync(dirname).filter((file) => {
      return file.startsWith(`${user.uid}.`);
    });

    imgPath += files.length === 0 ? "standard.png" : files[0];

    const file = createReadStream(imgPath);

    res.set({
      "Content-Type": "image/jpeg"
    });

    return new StreamableFile(file);
  }

  @Get(":username")
  async findUsersById(@Param("username") username: string) {
    try {
      const user: User = await this.userService.findUserByUsername(username);

      if (!user.isInitialized) {
        return HttpStatus.NOT_FOUND;
      }

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
  @UseGuards(AccessTokenGuard)
  async removeUser(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];
      const removeUserResp = await this.userService.removeUser(profile);

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
