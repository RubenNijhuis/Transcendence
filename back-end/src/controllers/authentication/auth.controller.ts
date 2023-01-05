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
import { AuthTokenType, LoginConfirmPayload } from "src/types/auth";

/**
 * The auth controller handles everything related to
 * the login process and the handling of authentication
 * tokens
 */
@Controller("auth")
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
        TWOfaEnabled: false,
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

      // Check if the user already exists
      const user: User = await this.userService.findUserByintraId(intraID);
      if (!user) {
        const new_user: User = await this.userService.createUser(intraID);
        const tokens: AuthTokenType = await this.authService.getTokens(
          new_user.uid
        );
        returnedPayload.authToken = tokens;
        const encrypted_token: string =
          await this.authService.createEncryptedToken(tokens);
        await this.userService.setRefreshToken(new_user.uid, encrypted_token);
        returnedPayload.shouldCreateUser = true;
      } else {
        if (!user.isInitialized) returnedPayload.shouldCreateUser = true;

        if (user.isInitialized) {
          if (user.isTfaEnabled === true) returnedPayload.TWOfaEnabled = true;

          const tokens: AuthTokenType = await this.authService.getTokens(
            user.uid
          );

          await this.userService.setRefreshToken(user.uid, tokens.refreshToken);

          returnedPayload.profile = this.userService.filterUser(user);
          returnedPayload.authToken = tokens;
        }
      }

      return returnedPayload;
    } catch (err) {
      console.error(err);
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
    const refreshTokenRes = await this.authService.isValidRefreshToken(
      refreshToken
    );

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
