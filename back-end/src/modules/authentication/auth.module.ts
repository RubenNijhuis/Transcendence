import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AccessTokenStrategy } from "src/middleware/jwt/access.strategy";
import { RefreshTokenStrategy } from "src/middleware/jwt/refresh.strategy";
import { AuthController } from "../../controllers/authentication/auth.controller";
import { AuthService } from "../../services/authentication/auth.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  providers: [AuthService, JwtService, RefreshTokenStrategy, AccessTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
