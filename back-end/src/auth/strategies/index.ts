import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AuthenticationProvider } from '../services/auth/auth';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, '42'){
  constructor(private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly AuthService: AuthService,
    ) {
    super({
      authorizationURL: configService.get('INTRA_AUTH_URL'),
      tokenURL: configService.get('INTRA_TOKEN_URL'),
      clientID: configService.get('FORTYTWO_APP_ID'),
			clientSecret: configService.get('FORTYTWO_APP_SECRET'),
			callbackURL: configService.get('FORTYTWO_CALLBACK_URL'),
	  });
  }

  async validate(accessToken: string) {
    console.log("Entered Validate");
    const data = await this.httpService.get(this.configService.get('INTRA_GET_ME_URL'),
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).toPromise();
		const uid = data.data.id;
		const username = data.data.login;
		const CreateUserDto = { uid, username };
    return await this.AuthService.validateUser(CreateUserDto);
  }
}

//constructor params: private readonly configService: ConfigService,
//      private readonly httpService: HttpService