import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, '42'){
  constructor(private readonly configService: ConfigService,
      private readonly httpService: HttpService
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
    const data = await this.httpService.get(this.configService.get('INTRA_GET_ME_URL'),
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).toPromise();
		const intraID = data.data.id;
		const username = data.data.login;
		const validateUserDto = { intraID, username };
  }
}
