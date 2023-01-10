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
      const { data } = await this.authService.getBearerToken(token);
      const userData = await this.authService.getUserData(data.access_token);
      const intraID = userData.data.id;

      const tokens: AuthTokenType = await this.userService
        .findUserByintraId(intraID)
        .then(async (profile) => {
          // if user exists
          const tokens: AuthTokenType = await this.authService.getTokens(
            profile.uid
          );
          if (profile.isTfaEnabled === true) {
            returnedPayload.TWOfaEnabled = true;
          } else if (!profile.isInitialized) {
            returnedPayload.shouldCreateUser = true;
          } else if (profile.isInitialized) {
            returnedPayload.profile = this.userService.filterProfile(profile);
          }
          await this.userService.setRefreshToken(
            profile.uid,
            tokens.refreshToken
          );
          return tokens;
        })
        .catch(async () => {
          // if user doesnt exist
          const new_profile = await this.userService.createUser(intraID);
          const tokens: AuthTokenType = await this.authService.getTokens(
            new_profile.uid
          );
          const encrypted_token: string =
            await this.authService.createEncryptedToken(tokens);
          await this.userService.setRefreshToken(
            new_profile.uid,
            encrypted_token
          );
          returnedPayload.shouldCreateUser = true;
          return tokens;
        });

      returnedPayload.authToken = tokens;
      return returnedPayload;
    } catch (err) {
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

  /**
   * Returns a user from the database using the authentication token
   * @param req
   * @returns
   */
  @UseGuards(AccessTokenGuard)
  @Get("getUserFromAccessToken")
  async getUserByID(@Req() req: Request) {
    const profile: User = req.user["profile"];
    return profile;
  }
}
