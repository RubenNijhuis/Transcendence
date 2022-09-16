// Nestjs stuff
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";

// Types
import { Response } from "express";

// Services
import { AuthService } from "../services/auth.service";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";

// Input checks
import { UsernameDto } from "../dto/username.dto";
import { twofadto } from "../dto/2fa.dto";

// Tokens
import { Jwt2faStrategy } from "../strategies/jwt.strategy";
import { JwtService } from "@nestjs/jwt";

// Requests
import Axios from "axios";

@Controller("auth")
export class AuthController {
  inject: [ConfigService];
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
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
    /**
     * TODO: put requests into proxy functions to decouple
     * 3rd party authentication with app logic
     */
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

    const userData = await Axios.get(
      this.configService.get("INTRA_GET_ME_URL"),
      {
        headers: {
          Authorization: `Bearer ${accessTokenResp.data.access_token}`
        }
      }
    );

    const username = userData.data.login;

    // const CreateUserDto = { intraID, username };

    const jwtPayload = {
      username: username
    };

    const jwtResp = this.jwtService.sign(jwtPayload);
    // this.addjwttoken(usernameDto, ret);
    // const decodedJwtAccessToken = this.authService.jwtDecodeUsername(ret);
    // console.log(decodedJwtAccessToken);

    return this.authService.validateUser(username, jwtResp);
  }

  // TODO: how are we going to store status?
  @Get("status")
  status() {}

  // TODO: logout probably not required with jwt
  @Get("logout")
  logout() {}

  // TODO: remove -> signup done through create account user controller
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
    const ret = await this.authService.login(userDto);
    console.log("jwt test: ", ret);
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
      console.log("POST google2fa res: ", res);
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
