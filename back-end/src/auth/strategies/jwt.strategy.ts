import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class Jwt2faStrategy extends PassportStrategy(Strategy, 'jwt-2fa') {
  constructor(private readonly userService: UsersService) {
    console.log("check");
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret',//make this a secret?
    });
  }

  async validate(payload: any) {
    console.log("help");
    const user = await this.userService.findUserByUsername(payload.username);

    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
    if (payload.isTwoFactorAuthenticated) {
      return user;
    }
  }
}