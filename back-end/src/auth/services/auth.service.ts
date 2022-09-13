import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dtos/create-users.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // returnen of de eerste keer inloggen
  // jwt token aanmaken
  // { creatAccount: authToken, jwt: string}
  // return await this.createUser(userDto);
  // new user in table zetten (uninit)
  async validateUser(userDto: CreateUserDto): Promise<any> {
    let res = {
      shouldCreateUser: false,
      profile: null,
      authToken: "sock yer dads"
    }
    const user = await this.usersService.findUsersByIntraId(userDto.intraID);
    if (user)
      res.profile = user;
    else
      res.shouldCreateUser = true;
    return res;
  }

  private async createUser(userDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(userDto);
  }

  findUser() {
    throw new Error("Method not implemented.");
  }

  signup() {
    return { msg: "I have signed up" };
  }

  signin() {
    return { msg: "I have signed in" };
  }
}
