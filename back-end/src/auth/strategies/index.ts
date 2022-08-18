import { Strategy } from "passport-local";
import { PassportStrategy} from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { User } from "src/typeorm";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(accessToken: string, refreshToken: string, Promise: Promise<any>) {
    
  }
}