import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
// import { AuthService } from 'src/services/authentication/auth.service';

type JwtPayload = {
  sub: string;
  username: string;
};

type PayloadType = {
  intraID: string;
};


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true, //yes??
    });
  }

  validate(req: Request, payload: any) {
    const accessToken = req.get('Authorization').replace('Bearer', '').trim();
    const decodedJwt = this.jwtService.decode(accessToken) as PayloadType;
    const intraID: string = decodedJwt.intraID;
    return { ...payload, intraID };
  }
}
