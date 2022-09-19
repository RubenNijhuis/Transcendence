import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { authenticator } from "otplib";
import { CreateUserDto } from "src/dtos/user/create-user.dto";
import { UserService } from "src/services/user/user.service";
import { twoFaDto } from "../../dtos/auth/twofa.dto";
import { toDataURL } from "qrcode";
import { UsernameDto } from "../../dtos/auth/username.dto";
import { User } from "src/entities";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(intraId: string): Promise<any> {
    const res: any = {
      shouldCreateUser: false,
      profile: null,
      authToken: "sock yer dads"
    };

    const user: User = await this.usersService.findUsersByintraId(intraId);

    if (user) {
      res.profile = user;
    } else {
      res.shouldCreateUser = true;
    }
    console.log(JSON.stringify(user))
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

  async addjwttoken(usernameDto: UsernameDto, token: string) {
    const ret = await this.usersService.findUserByUsername(
      usernameDto.username
    );

    this.usersService.addsessiontoken(usernameDto, token);
  }

  async login(usernameDto: UsernameDto) {
    const r = await this.usersService.findUserByUsername(usernameDto.username);
    // if (r.jwtsession_token != "")
    // {
    //   console.log("jwt token already exists dayo~!");
    //   return -1 ;
    // }

    const payload = {
      username: usernameDto.username
    };
    const ret = this.jwtService.sign(payload);
    this.addjwttoken(usernameDto, ret);

    return ret;
  }

  async isTwoFactorAuthenticationCodeValid(twoFaDto: twoFaDto) {
    const ret = await this.usersService.findUserByUsername(twoFaDto.username);
    console.log(twoFaDto.twoFactorAuthenticationCode);
    console.log(ret.twoFactorAuthenticationSecret);

    const res = authenticator.check(
      twoFaDto.twoFactorAuthenticationCode,
      ret.twoFactorAuthenticationSecret
    );
    console.log(res);
    return res;
  }

  async generateTwoFactorAuthenticationSecret(usernameDto: UsernameDto) {
    const ret = await this.usersService.findUserByUsername(
      usernameDto.username
    );

    if (!ret || ret.isTwoFactorAuthenticationEnabled === false) {
      throw TypeError;
    }
    var secret = "";
    if (ret.twoFactorAuthenticationSecret == "") {
      secret = authenticator.generateSecret();
      console.log("secret:");
      console.log(secret);
      this.usersService.update2fasecret(usernameDto, secret);
    } else {
      secret = ret.twoFactorAuthenticationSecret;
    }
    const otpauthUrl = authenticator.keyuri(
      usernameDto.username,
      "TRANSCEND_2FA",
      secret
    );

    console.log("otapathurl:");
    console.log(otpauthUrl);

    console.log("todataurl:");
    const res = toDataURL(otpauthUrl);

    return toDataURL(otpauthUrl);
  }
}
