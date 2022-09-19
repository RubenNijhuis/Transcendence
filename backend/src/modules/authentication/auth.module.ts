import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "src/models/user/modules";
import { AuthController } from "../../controllers/authentication/auth.controller";
import { AuthService } from "../../services/authentication/auth.service";

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot()
    ],
    providers: [
        AuthService
    ],
    controllers: [
        AuthController
    ],
})
export class AuthModule {}