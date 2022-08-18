import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'oauth'){
  constructor(private readonly configService: ConfigService,
      private readonly httpService: HttpService
    ) {
    super({
      authorizationURL: configService.get('INTRA_AUTH_URL'),
      tokenURL: configService.get('INTRA_TOKEN_URL'),
      clientID: configService.get('INTRA_CLIENT_ID'),
			clientSecret: configService.get('INTRA_CLIENT_SECRET'),
			callbackURL: configService.get('INTRA_CALLBACK_URL'),
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