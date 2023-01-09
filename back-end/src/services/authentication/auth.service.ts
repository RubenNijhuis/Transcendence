// TODO: order and label imports
import { Injectable, ForbiddenException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { User } from "src/entities";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UpdateResult } from "typeorm";
import { createHash } from "crypto";

// Types
import { AuthTokenType, JwtPayload } from "src/types/auth";

import * as jwt from "jsonwebtoken";

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
        redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL"),
        code: token
      }
    });
  }

  // create a token based on input
  // to be used as token to insert in user
  async createEncryptedToken(tokens: AuthTokenType): Promise<string> {
    const hash = createHash("sha256").update(tokens.refreshToken).digest("hex");
    // TODO: add this to some kind of encryption service
    const saltorounds: string =
      this.configService.get<string>("SALT_OR_ROUNDS");
    const numsalt: number = +saltorounds;
    return await bcrypt.hash(hash, numsalt);
  }

  // TODO: abstract axios into a proxy library
  // And also should this be async
  // TODO: dont return any type
  async getUserData(bearerToken: string): Promise<any> {
    const userDataFromAuthParty = await Axios.get(
      this.configService.get("INTRA_GET_ME_URL"),
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );

    return userDataFromAuthParty;
  }

  jwtDecodeUsername(jwt: string): string {
    const { uid } = this.jwtService.decode(jwt) as JwtPayload;
    return uid;
  }

  /**
   * NOTE: refreshtoken shouldn't be refreshed right? because now it gets
   * refreshed everytime the website is reloaded. You could theoretically
   * steal the token and use it forever?
   */
  async getTokens(uid: string): Promise<AuthTokenType> {
    try {
      const returnedPayload: AuthTokenType = {
        accessToken: "",
        refreshToken: ""
      };

      const tokenPayload = { uid };

      const jwtAccessSecret =
        this.configService.get<string>("JWT_ACCESS_SECRET");
      const jwtRefreshSecret =
        this.configService.get<string>("JWT_REFRESH_SECRET");

      returnedPayload.accessToken = await this.jwtService.signAsync(
        tokenPayload,
        {
          secret: jwtAccessSecret,
          expiresIn: "15m"
        }
      );

      returnedPayload.refreshToken = await this.jwtService.signAsync(
        tokenPayload,
        {
          secret: jwtRefreshSecret,
          expiresIn: "7d"
        }
      );

      return returnedPayload;
    } catch (err) {
      return err;
    }
  }

  //TODO: remove all extra info after access denied in the throw errors. Could be used to figure out how the program works
  // checks if refresh token is valid and replaces it (for now everytime)
  async isValidRefreshToken(refreshToken: string): Promise<AuthTokenType> {
    //****    verify if it's a valid refresh token
    const secret: string = this.configService.get<string>("JWT_REFRESH_SECRET");

    const isValidRefToken: string = jwt.verify(refreshToken, secret) as string;

    if (!isValidRefToken)
      throw new ForbiddenException("Access Denied: Not a valid Token");

    //****    decode token to get uid
    const decoded: JwtPayload = this.jwtService.decode(
      refreshToken
    ) as JwtPayload;

    if (!decoded) throw new ForbiddenException("Access Denied: Cannot decode");

    try {
      //****  get user by intraid to see if person exists
      const user: User = await this.userService.findUserByUidNoFilter(
        decoded.uid
      );
      console.log(user, refreshToken);
      if (!user || !user.refreshToken)
        throw new ForbiddenException("Access Denied: No user in database");

      //****  hash the token to be able to compare and validate it to the hashed token in the database
      const hash = createHash("sha256").update(refreshToken).digest("hex");
      const isMatch: boolean = await bcrypt.compare(hash, user.refreshToken);

      if (isMatch == false)
        throw new ForbiddenException("Access Denied: Not a match");

      //****  update token in the backend
      const tokens: AuthTokenType = await this.getTokens(decoded.uid);

      const addUser: UpdateResult = await this.userService.setRefreshToken(
        user.uid,
        tokens.refreshToken
      );
      if (!addUser)
        throw new ForbiddenException("Access Denied: Failed to add token");
      return tokens;
    } catch (err) {
      // console.error(e);
      return err;
    }
  }
}
