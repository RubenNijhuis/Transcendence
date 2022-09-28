import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AuthService } from "../../services/authentication/auth.service";
import { Request } from "express";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { UserService } from "src/services/user/user.service";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";

@Controller("Auth")
export class AuthController {
  inject: [ConfigService, UserService];
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  @Get("login")
  login() {
    const url: string = this.configService.get<string>("INTRA_AUTH_URL");
    const params: any = {
      client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
      redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL"),
      state: this.configService.get<string>("FORTYTWO_STATE"),
      response_type: "code"
    };
    const redirectUrl: string = Axios.getUri({ url, params });
    console.log(redirectUrl);

    return redirectUrl;
  }

  @Get("confirm?")
  async confirm(@Query("token") token: string) {
    try {
      // Turns the token from redirect into a token
      // console.log("first token:", token);
      const res = await this.authService.getBearerToken(token);
      // console.log("token: ", res.data.access_token);

      const userData = await this.authService.getUserData(
        res.data.access_token
      );
      const intraID = userData.data.id;
      const username = userData.data.login;
      // console.log("intraID", intraID);

      const tokens = await this.authService.getTokens(intraID);
      const hash1 = createHash('sha256').update(tokens.refreshToken).digest('hex');
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(hash1, saltOrRounds);
      // console.log("tokens:", tokens);

      const CreateUserDto = { username: username };
      await this.userService.createUser(intraID, hash);

      //TO DO: check if exists first before adding
      // this.authService.addReftoken(CreateUserDto, tokens.refreshToken);
      console.log("refreshtoken for testing:", tokens.refreshToken);
      return await this.authService.validateUser(
        intraID,
        tokens.accessToken,
        tokens.refreshToken
      );
    } catch (err: any) {
      return err;
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Req() req: Request) {
    const refreshToken = req.user["refreshToken"];
    return this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @Get("test")
  acessTokens(@Req() req: Request) {
    const intraID = req.user["intraID"];
    console.log("IntraID:", intraID);
  }
}
