import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards
} from "@nestjs/common";
import { ADDRCONFIG } from "dns";
import { Response } from "express";
import { FortyTwoAuthGuard } from "src/auth/guard";
import { User } from "src/typeorm";
import { ConfirmDto } from "../dto/confirm.dto";
import { AuthService } from "../services/auth.service";
import { HttpService } from "@nestjs/axios";
import Axios from "axios";
import { ConfigService } from "@nestjs/config";
import { env } from "process";

@Controller("auth")
export class AuthController {
  inject: [ConfigService];
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Get("login")
  @UseGuards(FortyTwoAuthGuard)
  login() {}

  // @Get('42/callback')
  // // @UseGuards(FortyTwoAuthGuard)
  // redirect(@Res() res: Response) {
  //   res.sendStatus(200);
  // }

  @Post("confirm")
  // @UseGuards(FortyTwoAuthGuard)
  async confirm(@Body() confirmDto: ConfirmDto) {
    const ret: any = await Axios.post(
      this.configService.get<string>("INTRA_TOKEN_URL"),
      {
        params: {
          grant_type: "authorization_code",
          client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
          client_secret: this.configService.get<string>("FORTYTWO_APP_SECRET"),
          code: confirmDto.token,
          redirect_url: this.configService.get<string>("FORTYTWO_CALLBACK_URL")
        }
      }
    );

    const data = await Axios.get(this.configService.get("INTRA_GET_ME_URL"), {
      headers: { Authorization: `Bearer ${ret.access_token}` }
    });
    // const intraID = data.data.id;
    // const username = data.data.login;
    // const CreateUserDto = { intraID, username };
    return data;
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
