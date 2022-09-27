import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "../../controllers/authentication/auth.controller";
import { AuthService } from "../../services/authentication/auth.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, ConfigModule.forRoot()],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
