import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, '42'){
  constructor(private readonly configService: ConfigService) {
    super({
		clientID: configService.get<string>('FORTYTWO_CLIENT_ID'),
		clientSecret: configService.get<string>('FORTYTWO_APP_SECRET'),
		callbackURL: configService.get<string>('CALLBACK'),
		passReqToCallback: true,
	});
  }

  async validate(
	request: { session: { accessToken: string } },
	accessToken: string,
    refreshToken: string,
    profile: Profile,
    cb: VerifyCallback,
  ): Promise<any> {
    request.session.accessToken = accessToken;
	// user aanpassen om te zoeken op accessToken (of refreshToken?)
	// als user niet bestaat dan een nieuwe user aanmaken
    console.log('accessToken', accessToken, 'refreshToken', refreshToken);
    return cb(null, profile);
  }
}