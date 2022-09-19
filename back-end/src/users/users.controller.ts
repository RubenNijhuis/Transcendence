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
import { MulterModule } from "@nestjs/platform-express";
import { UsernameDto } from "src/auth/dto/username.dto";
import { seederConfig } from "src/configs/seeder.config";
import { UserSeeder } from "src/database/seeds/user-create.seed";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UsersService } from "src/users/users.service";
import { UploadImgDto } from "./dtos/upload-img.dto";
import User from "./user.entity";
const multer  = require('multer')

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get("id/:username")
  findUsersById(@Res() res: Response, username: string) {
    try {
      return this.userService.findUserByUsername(username);
    } catch (error) {
      res.status;
    }
  }

  @Post("create")
  @UsePipes(ValidationPipe)
  async createUsers(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      const user: User = await this.userService.createUser(createUserDto);
      const ret = user;
      console.log("user obj:", user);
      return ret;
    } catch (error) {
      return error;
    }
  }

  @Get("seeder")
  async seedUsers() {
    // Creates 200 users
    const seed = new UserSeeder({ seedingSource: seederConfig });
    await seed.run();
  }

    @Post('upload-img')
    async uploadImg(@Body() upload: UploadImgDto,
        @UploadedFile( new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 1000
                    }),
                    new FileTypeValidator({
                        fileType: 'jpeg'
                }),
                ],
            })
        ) file: Express.Multer.File
    ) {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '/src/uploads')
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = upload.intraId // get this from jwt
                cb(null, file.fieldname + '-' + uniqueSuffix)
            }
        })
        const ret = MulterModule.register({
            dest: 'src/uploads' + upload.type,
        })
    }

  @Post("turnon2fa")
  @UsePipes(ValidationPipe) //what does this do
  async turnon2fa(@Body() usernameDto: UsernameDto) {
    // const isCodeValid = this.userService.isTwoFactorAuthenticationCodeValid(twoFaDto);
    // if (!isCodeValid) {
    //     throw new UnauthorizedException('Wrong authentication code');
    // }
    try {
      await this.userService.turnOn2fa(usernameDto);
    } catch (error) {
      return error;
    }
  }
}
