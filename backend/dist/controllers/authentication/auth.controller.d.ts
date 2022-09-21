import { ConfigService } from "@nestjs/config";
import { AuthService } from "../../services/authentication/auth.service";
export declare class AuthController {
    private readonly authService;
    private readonly configService;
    inject: [ConfigService];
    constructor(authService: AuthService, configService: ConfigService);
    login(): string;
    confirm(token: string): Promise<any>;
}
