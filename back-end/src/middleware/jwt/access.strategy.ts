import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayload } from "src/types/auth";
import { UserService } from "src/services/user/user.service";
// import { AuthService } from 'src/services/authentication/auth.service'

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-access"
) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    try {
      const accessToken = req.get("Authorization").replace("Bearer", "").trim();
      const decodedJwt = this.jwtService.decode(accessToken) as JwtPayload;

      const uid: string = decodedJwt.uid;
      const user = await this.userService.findUserByUidNoFilter(uid);

      return { ...payload, uid, profile: user };
    } catch (err) {
      console.error(err);
    }
  }
}
