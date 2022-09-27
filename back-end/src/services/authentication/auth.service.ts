import { Injectable, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { User } from "src/entities";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UsernameDto } from "src/dtos/auth";

const jwt = require("jsonwebtoken");

type PayloadType = {
  intraID: string;
};

interface AuthTokenType {
  jsonWebToken: string;
  refreshToken: string;
}


@Injectable()
export class AuthService {
  inject: [ConfigService];
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  getBearerToken(token: string): Promise<any> {
    return Axios.post(this.configService.get<string>("INTRA_TOKEN_URL"), null, {
      params: {
        grant_type: "authorization_code",
        client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
        client_secret: this.configService.get<string>("FORTYTWO_APP_SECRET"),
        code: token,
        redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL")
      }
    });
  }

  getUserData(bearerToken: string): Promise<any> {
    return Axios.get(this.configService.get("INTRA_GET_ME_URL"), {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  }

  async validateUser(intraID: string, authtoken: string, refreshtoken: string): Promise<any> {
    const res: any = {
      shouldCreateUser: false,
      profile: null,
      AuthTokenType: {
        jsonWebToken: authtoken,
        refeshToken: refreshtoken
      }
    };

    const user: User = await this.userService.findUserByintraId(intraID);

    if (user) {
      res.profile = user;
    } else {
      res.shouldCreateUser = true;
    }
    console.log("stringify:", JSON.stringify(user)); //this returns null?
    return res;
  }

  jwtDecodeUsername(jwt: string): string {
    const decodedJwt = this.jwtService.decode(jwt) as PayloadType;
    return decodedJwt.intraID;
  }

  async getTokens(intraID: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          intraID,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          intraID,
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

  async refreshTokens(refreshToken: string) {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET')
    const isValidRefToken = jwt.verify(
      refreshToken, secret
    );
    if (!isValidRefToken)
      throw new ForbiddenException('Access Denied');

    const decoded = this.jwtService.decode(refreshToken) as PayloadType;
    if (!decoded)
      throw new ForbiddenException('Access Denied');
    const user = await this.userService.findUserByUsername(decoded.intraID);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isMatch)
      throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.username);

    const CreateUserDto = { username: decoded.intraID };
    return tokens;
  }

  addReftoken(userDto: UsernameDto, token: string)
  {
    this.userService.setRefreshToken(userDto, token);
  }
}
