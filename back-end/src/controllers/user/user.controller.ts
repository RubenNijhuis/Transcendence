// basic nest functionallity
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";


// dtos
import { UsernameDto } from "src/dtos/auth/username.dto";
import { SetTfaDto } from "src/dtos/auth/setTfa.dto";
import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { UploadImgDto } from "../../dtos/database/upload-img.dto";

// user functionalities
import { UserService } from "src/services/user/user.service";

// seeding config
import { seederConfig } from "src/configs/seeder/seeder.config";

// seeding entity
import { UserSeeder } from "src/database/seeds/user-create.seed";

// user entity
import User from "../../entities/user/user.entity";

// file upload library
import { MulterModule } from "@nestjs/platform-express";
import UserRoutes from "src/configs/routes/globalRoutes.config";
import { SeederAmountDto } from "src/dtos/seeder/custom-seeder.dto";
const multer = require("multer");

/**
 * The user controller will act as the first entry point for user related api calls.
 * 
 * The user api functionality contains:
 * - getting all users or a specified user
 * - creating and removing a specified user
 * - enabling 2fa
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

  @Post(UserRoutes.create)
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user: User = await this.userService.createUser(createUserDto);
      const ret = user;
      console.log("user obj:", user);
      return ret;
    } catch (error) {
      return error;
    }
  }

  @Post(UserRoutes.remove)
  @UsePipes(ValidationPipe)
  async removeUser(@Body() dto: UsernameDto) {
    try {
      const ret = await this.userService.removeUser(dto.username);
    } catch (error) {
      return error;
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
      await this.userService.setTfa(dto.username, dto.option);
    } catch (error) {
      return error;
    }
  }

  @Post("upload-img")
  async uploadImg(
    @Body() upload: UploadImgDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1000
          }),
          new FileTypeValidator({
            fileType: "jpeg"
          })
        ]
      })
    )
    file: Express.Multer.File
  ) {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "/src/uploads");
      },
      filename: function (req, file, cb) {
        const uniqueSuffix = upload.intraId; // get this from jwt
        cb(null, file.fieldname + "-" + uniqueSuffix);
      }
    });
    const ret = MulterModule.register({
      dest: "src/uploads" + upload.type
    });
  }

  @Get(UserRoutes.seed)
  async seedUsers() {
    const seed = new UserSeeder({ seedingSource: seederConfig });
    await seed.run();
  }

  @Post(UserRoutes.seedAmount)
  async seedUsersAmount(@Body() dto: SeederAmountDto) {
    return await this.userService.seedCustom(dto.amount);
  }
}
