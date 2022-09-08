import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseGuards
} from "@nestjs/common";
import { ADDRCONFIG } from "dns";
import { Response } from "express";
import { FortyTwoAuthGuard } from "src/auth/guard";
import { User } from "src/typeorm";
import { ConfirmDto } from "../dto/confirm.dto";
import { AuthService } from "../services/auth.service";
import Axios from "axios";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  inject: [ConfigService];
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get("login")
  //   @UseGuards(FortyTwoAuthGuard)
  login() {
    const url: string = this.configService.get<string>("INTRA_AUTH_URL");
    const params: any = {
      client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
      redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL"),
      response_type: "code"
    };
    const redirectUrl: string = Axios.getUri({ url, params });

    return redirectUrl;
  }

  // @Get('42/callback')
  // // @UseGuards(FortyTwoAuthGuard)
  // redirect(@Res() res: Response) {
  //   res.sendStatus(200);
  // }

  @Get("confirm?")
  // @UseGuards(FortyTwoAuthGuard)
  async confirm(@Query("token") token: string) {
    // Turns the token from redirect into a token
    const accessTokenResp: any = await Axios.post(
      this.configService.get<string>("INTRA_TOKEN_URL"),
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
          client_secret: this.configService.get<string>("FORTYTWO_APP_SECRET"),
          code: token,
          redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL")
        }
      }
    );

    console.log(accessTokenResp.data.access_token);

    const userData = await Axios.get(
      this.configService.get("INTRA_GET_ME_URL"),
      {
        headers: {
          Authorization: `Bearer ${accessTokenResp.data.access_token}`
        }
      }
    );

    // const intraID = data.data.id;
    // const username = data.data.login;
    // const CreateUserDto = { intraID, username };
    return userData.data;
  }

  @Get("status")
  status() {}

  @Get("logout")
  logout() {}

  @Post("singup")
  signup() {
    return this.authService.signup;
  }

  @Post("singin")
  signin() {
    return this.authService.signin;
  }
}
