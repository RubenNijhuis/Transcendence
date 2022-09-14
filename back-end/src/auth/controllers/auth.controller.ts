import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { ADDRCONFIG } from "dns";
import { Response } from "express";
import { FortyTwoAuthGuard } from "src/auth/guard";
import { User } from "src/typeorm";
import { ConfirmDto } from "../dto/confirm.dto";
import { AuthService } from "../services/auth.service";
import Axios from "axios";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { Jwt2faStrategy } from "../strategies/jwt.strategy";
import { MailDto } from "../dto/mail.dto";
import { twofadto } from "../dto/2fa.dto";
import { UsernameDto } from "../dto/username.dto";
import { CreateUserDto } from "src/users/dtos/create-users.dto";

@Controller("auth")
export class AuthController {
  inject: [ConfigService];
  constructor(
    private readonly usersService: UsersService,
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
      state: this.configService.get<string>("FORTYTWO_STATE"),
      response_type: "code"
    };
    const redirectUrl: string = Axios.getUri({ url, params });
    console.log(redirectUrl);

    return redirectUrl;
  }

  // const reurl = href;
  // const state = href.split("state=")[1].substring(0, 40);
  // console.log("\n\n")
  // console.log(state);
  // console.log(token);
  // Axios.get(url).then((res) => console.log(res));

  // @Get('42/callback')
  // // @UseGuards(FortyTwoAuthGuard)
  // redirect(@Res() res: Response) {
  //   res.sendStatus(200);
  // }

  //   curl -F grant_type=authorization_code \
  // -F client_id=9b36d8c0db59eff5038aea7a417d73e69aea75b41aac771816d2ef1b3109cc2f \
  // -F client_secret=d6ea27703957b69939b8104ed4524595e210cd2e79af587744a7eb6e58f5b3d2 \
  // -F code=fd0847dbb559752d932dd3c1ac34ff98d27b11fe2fea5a864f44740cd7919ad0 \
  // -F redirect_uri=https://myawesomeweb.site/callback \
  // -X POST https://api.intra.42.fr/oauth/token

  @Get("confirm?")
  // @UseGuards(FortyTwoAuthGuard)
  async confirm(@Query("token") token: string) {
    // Turns the token from redirect into a token
    console.log(token);
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

    console.log("token: ", accessTokenResp.data.access_token);

    const userData = await Axios.get(
      this.configService.get("INTRA_GET_ME_URL"),
      {
        headers: {
          Authorization: `Bearer ${accessTokenResp.data.access_token}`
        }
      }
    );
    const intraID = userData.data.id;
    const username = userData.data.login;
    console.log(intraID);
    console.log(username);
      const CreateUserDto = { intraID, username };
      
    return this.authService.validateUser(intraID);
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

  //curl --data "username=akramp"  http://localhost:3000/api/auth/jwtsession
  @UseGuards(Jwt2faStrategy)
  @Post("jwtsession")
  @UsePipes(ValidationPipe)
  async jwtsession(@Body() userDto: UsernameDto) {
    console.log("jwt test:");
    const ret = await this.authService.login(userDto);
    console.log(ret);
    return ret;
    //I still need to make sure this then gets saved and used with right guards
  }

  //curl --data "username=akramp"  http://localhost:3000/api/users/turnon2fa
  //curl --data "username=akramp"  -H "Authorization: Bearer {'jwtsession_token'}" http://localhost:3000/api/auth/google2fa
  @Post("google2fa")
  @UseGuards(Jwt2faStrategy)
  @UsePipes(ValidationPipe)
  async google2fa(@Body() userDto: UsernameDto) {
    try {
      const res = await this.authService.generateTwoFactorAuthenticationSecret(
        userDto
      );
      console.log(res);
    } catch (error) {
      return error;
    }
  }

  //curl --data "username=akramp&twoFactorAuthenticationCode="  http://localhost:3000/api/auth/google2fa/authenticate
  @Post("google2fa/authenticate")
  @UseGuards(Jwt2faStrategy)
  async authenticate(@Res() res: Response, @Body() twofadto: twofadto) {
    const isCodeValid =
      await this.authService.isTwoFactorAuthenticationCodeValid(twofadto);
    if (isCodeValid === false) {
      throw new UnauthorizedException("Wrong authentication code");
    }
    res.sendStatus(200);
  }

  @Post("Test")
  @UseGuards(Jwt2faStrategy)
  async test() {
    console.log("UwU!!");
  }
}
