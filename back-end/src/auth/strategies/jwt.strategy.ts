import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { MailDto } from 'src/users/dtos/mail.dto';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') { //remove jwt stuff from the auth controller 
  constructor(private readonly userService: UsersService) {
    // console.log("check");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ///Okay so I think we need to implement the jwt strat to use this
      secretOrKey: 'secret',//make this a secret?
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