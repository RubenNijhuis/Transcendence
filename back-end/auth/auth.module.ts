import { Module } from "@nestjs/common";
import { UserModule } from "src/models/user/modules/index";
import { LocalStrategy } from "./strategies";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    UserModule,
    ConfigModule,
    HttpModule,
    ConfigModule.forRoot(),
    PassportModule, 
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_PRIV_SECRET,
      signOptions: { expiresIn: '365D' },
    }),
  ],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}