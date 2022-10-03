import {
  Controller,
  Get,
  HttpException,
  Query,
  Req,
  UseGuards
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AuthService } from "../../services/authentication/auth.service";
import { Request } from "express";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { UserService } from "src/services/user/user.service";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";
import { JwtService } from "@nestjs/jwt";

/**
 * The auth controller handles everything related to
 * the login process and the handling of authentication
 * tokens
 */
@Controller("Auth")
export class AuthController {
  inject: [ConfigService, UserService];
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Creates a url that gets sent to the front-end. On that page
   * the user can log in using the third party authentication system.
   * @returns the 3d party login url
   */
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

    return redirectUrl;
  }

  /**
   * Takes a third party authentication token that can be
   * used to setup an account
   * @param token identifier from a third party auth system
   * @returns a payload describing what the front-end should do
   */
  @Get("confirm?")
  async confirm(@Query("token") token: string) {
    try {
      /*
       * Takes the given code and uses it too give a token we
       * can use to get the third party profile data
       */
      const { data } = await this.authService.getBearerToken(token);
      const userData = await this.authService.getUserData(data.access_token);

      // The third party UID
      const intraID = userData.data.id;
      const username = userData.data.login;

      // Create the tokens to be used for authentication
      const tokens = await this.authService.getTokens(intraID);
      // TODO: rename variable hash1 isn't very discriptive
      const hash1 = createHash("sha256")
        .update(tokens.refreshToken)
        .digest("hex");
      // TODO: should be an env variable
      const saltOrRounds = 10;
      // TODO: should be party of a custom library
      const hash = await bcrypt.hash(hash1, saltOrRounds);

      // TODO: is this variable still being used?
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
      console.log(err);
      throw err;
    }
  }

  /**
   * Will refresh an authentication token
   * @param req
   * @returns
   */
  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  refreshTokens(@Req() req: Request) {
    const refreshToken = req.user["refreshToken"];
    return this.authService.refreshTokens(refreshToken);
  }

  // TODO: cleanup? is this still required?
  //   @UseGuards(AccessTokenGuard)
  //   @Get("test")
  //   accessTokens(@Req() req: Request) {
  //     const intraID = req.user["intraID"];
  //     console.log("IntraID:", intraID);
  //   }

  // TODO: this should be in the user controller
  /**
   * Returns a user from the database using the authentication token
   * @param req
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @Get("getUserFromAccessToken")
  getUserByID(@Req() req: Request) {
    const intraID = req.user["intraID"];
    const user = this.userService.findUserByintraId(intraID);
    return user;
  }
}
