import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { MailDto } from '../dto/mail.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') { //remove jwt stuff from the auth controller 
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ///Okay so I think we need to implement the jwt strat to use this
      secretOrKey: configService.get('JWT_CONSTANTS_SECRET'),
    });
  }

  async validate(payload: MailDto) {
    const user = await this.userService.findUserByUsername(payload.username);

    if (user) {
      return user;
    }
  }

  // async validate(payload: any) {
  //   console.log("help");
  //   const user = await this.userService.findUserByUsername(payload.username);

  //   if (!user.isTwoFactorAuthenticationEnabled) {
  //     return user;
  //   }
  //   if (payload.isTwoFactorAuthenticated) {
  //     return user;
  //   }
  // }
}