// TODO: categorize the imports
// TODO: abstract Axios into a proxy library
import Axios from "axios";
import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RefreshTokenGuard } from "src/guards/refreshToken.guard";
import { AuthService } from "../../services/authentication/auth.service";
import { Request } from "express";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { UserService } from "src/services/user/user.service";
import * as bcrypt from "bcrypt";
import { createHash } from "crypto";
import { JwtService } from "@nestjs/jwt";
import User from "src/entities/user/user.entity";
import { LoginConfirmPayload } from "src/types/auth";

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
    interface AuthServiceParams {
      client_id: string;
      redirect_uri: string;
      state: string;
      response_type: string;
    }

    const url: string = this.configService.get<string>("INTRA_AUTH_URL");
    const params: AuthServiceParams = {
      client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
      redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL"),
      state: this.configService.get<string>("FORTYTWO_STATE"),
      response_type: "code"
    };
    const redirectUrl: string = Axios.getUri({ url, params });

    return redirectUrl;
  }

  // TODO: checking if the user should be created needs to be a seperate function
  /**
   * Takes a third party authentication token that can be
   * used to setup an account
   * @param token identifier from a third party auth system
   * @returns a payload describing what the front-end should do
   */
  @Get("confirm?")
  async confirm(@Query("token") token: string): Promise<LoginConfirmPayload> {
    try {
      const returnedPayload: LoginConfirmPayload = {
        shouldCreateUser: false,
        profile: null,
        authToken: {
          accessToken: null,
          refreshToken: null
        }
      };

      /*
       * Takes the given code and uses it too give a token we
       * can use to get the third party profile data
       */
      const { data } = await this.authService.getBearerToken(token);
      const userData = await this.authService.getUserData(data.access_token);

      // The third party UID
      const intraID = userData.data.id;

      // Create the tokens to be used for authentication
      const tokens = await this.authService.getTokens(intraID);
      returnedPayload.authToken = tokens;

      // Check if the user already exists
      const user: User = await this.userService.findUserByintraId(intraID);

      if (!user) {
        const hash = createHash("sha256")
          .update(tokens.refreshToken)
          .digest("hex");
        // TODO: should be party of a custom library. angi: what do you mean???
        const saltorounds: string =
          this.configService.get<string>("SALT_OR_ROUNDS");
        const numsalt: number = +saltorounds;
        const encrypted_token = await bcrypt.hash(hash, numsalt);
        await this.userService.createUser(intraID, encrypted_token);
        returnedPayload.shouldCreateUser = true;
      }

      if (user.isInitialized === false) returnedPayload.shouldCreateUser = true;

      if (user && user.isInitialized) {
        const intraIDDto = { intraID };
        await this.userService.setRefreshToken(intraIDDto, tokens.refreshToken);
        returnedPayload.profile = this.userService.filterUser(user);
      }

      return returnedPayload;
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
  async refreshTokens(@Req() req: Request) {
    const refreshToken = req.user["refreshToken"];
    const refreshTokenRes = await this.authService.refreshTokens(refreshToken);

    return refreshTokenRes;
  }

  // TODO: this should be in the user controller
  /**
   * Returns a user from the database using the authentication token
   * @param req
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @Get("getUserFromAccessToken")
  async getUserByID(@Req() req: Request) {
    const intraID: string = req.user["intraID"];
    const user = await this.userService.findUserByintraId(intraID);

    const newUser = this.userService.filterUser(user);
    return newUser;
  }
}
