import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    inject: [ConfigService];
    constructor(userService: UserService, configService: ConfigService);
    getBearerToken(token: string): Promise<any>;
    getUserData(bearerToken: any): Promise<any>;
    validateUser(intraID: string): Promise<any>;
}
