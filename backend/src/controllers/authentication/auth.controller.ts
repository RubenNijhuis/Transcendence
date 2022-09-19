import { Controller, Get, Query } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { AuthService } from "../../services/authentication/auth.service";

@Controller("Auth")
export class AuthController {
  inject: [ConfigService];
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
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
    // Turns the token from redirect into a token
    console.log("first token:", token);
    const res: any = await this.authService.getBearerToken(token);
    console.log("token: ", res.data.access_token);

    const userData = await this.authService.getUserData(res.data.access_token);
    const intraID = userData.data.id;
    console.log(intraID);
    return this.authService.validateUser(intraID);
  }
}
