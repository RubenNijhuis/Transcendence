import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { authenticator } from "otplib";
import { UsersService } from "src/users/users.service";
import { twofadto } from "../dto/2fa.dto";
import { toDataURL } from "qrcode";
import { UsernameDto } from "../dto/username.dto";
import { User } from "src/typeorm";
import { ConfigService } from "@nestjs/config";

type PayloadType = {
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  // returnen of de eerste keer inloggen
  // jwt token aanmaken
  // { creatAccount: authToken, jwt: string}
  // return await this.createUser(userDto);
  // new user in table zetten (uninit)
  async validateUser(intraId: string, authtoken: string, refreshtoken: string): Promise<any> {
    const returnedPayload: any = {
      shouldCreateUser: false,
      profile: null,
      authToken: authtoken,
      refreshToken: refreshtoken,
    };

    const user: User = await this.usersService.findUsersByintraId(intraId);

    if (user) {
      returnedPayload.profile = user;
    } else {
      returnedPayload.shouldCreateUser = true;
    }

    return returnedPayload;
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

  jwtDecodeUsername(jwt: string): string {
    const decodedJwt = this.jwtService.decode(jwt) as PayloadType;
    return decodedJwt.username;
  }

  async addjwttoken(usernameDto: UsernameDto, token: string) {
    // TODO: what is ret used for?
    const ret = await this.usersService.findUserByUsername(
      usernameDto.username
    );

    this.usersService.addsessiontoken(usernameDto, token);
  }

  async login(usernameDto: UsernameDto) {
    // TODO: what is r used for?
    const r = await this.usersService.findUserByUsername(usernameDto.username);
    // if (r.jwtsession_token != "")
    // {
    //   console.log("jwt token already exists dayo~!");
    //   return -1 ;
    // }

    const jwtPayload = {
      username: usernameDto.username
    };

    const ret = this.jwtService.sign(jwtPayload);

    this.addjwttoken(usernameDto, ret);

    return ret;
  }

  async isTwoFactorAuthenticationCodeValid(Twofadto: twofadto) {
    const ret = await this.usersService.findUserByUsername(Twofadto.username);
    console.log("TFA auth code:: ", Twofadto.twoFactorAuthenticationCode);
    console.log("TFA secret: ", ret.twoFactorAuthenticationSecret);

    const res = authenticator.check(
      Twofadto.twoFactorAuthenticationCode,
      ret.twoFactorAuthenticationSecret
    );
    console.log("Authenticator check: ", res);
    return res;
  }

  async generateTwoFactorAuthenticationSecret(usernameDto: UsernameDto) {
    let secret: string;

    const ret = await this.usersService.findUserByUsername(
      usernameDto.username
    );

    if (!ret || ret.isTwoFactorAuthenticationEnabled === false) {
      throw TypeError;
    }

    if (ret.twoFactorAuthenticationSecret == "") {
      secret = authenticator.generateSecret();
      console.log("secret: ", secret);
      this.usersService.update2fasecret(usernameDto, secret);
    } else {
      secret = ret.twoFactorAuthenticationSecret;
    }

    const otpauthUrl = authenticator.keyuri(
      usernameDto.username,
      "TRANSCEND_2FA",
      secret
    );

    console.log("otapathurl: ", otpauthUrl);

    const res = toDataURL(otpauthUrl);

    return toDataURL(otpauthUrl);
  }

  async getTokens(username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

/**
 * Save refresh token in backend
 */