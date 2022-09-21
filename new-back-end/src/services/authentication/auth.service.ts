import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Axios from "axios";
import { User } from "src/entities";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  inject: [ConfigService];
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {}

  getBearerToken(token: string): Promise<any> {
    return Axios.post(this.configService.get<string>("INTRA_TOKEN_URL"), null, {
      params: {
        grant_type: "authorization_code",
        client_id: this.configService.get<string>("FORTYTWO_APP_ID"),
        client_secret: this.configService.get<string>("FORTYTWO_APP_SECRET"),
        code: token,
        redirect_uri: this.configService.get<string>("FORTYTWO_CALLBACK_URL")
      }
    });
  }

  getUserData(bearerToken: string): Promise<any> {
    return Axios.get(this.configService.get("INTRA_GET_ME_URL"), {
      headers: {
        Authorization: `Bearer ${bearerToken}`
      }
    });
  }

  async validateUser(intraID: string): Promise<any> {
    const res: any = {
      shouldCreateUser: false,
      profile: null,
      authToken: "sock yer dads"
    };
    const user: User = await this.userService.findUsersByintraId(intraID);

    if (user) {
      res.profile = user;
    } else {
      res.shouldCreateUser = true;
    }
    console.log(JSON.stringify(user));
    return res;
  }
}
