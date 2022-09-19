import { Response } from "express";
import { AuthService } from "../services/auth.service";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/users/users.service";
import { twoFaDto } from "../dto/2fa.dto";
import { UsernameDto } from "../dto/username.dto";
export declare class AuthController {
    private readonly usersService;
    private authService;
    private readonly configService;
    inject: [ConfigService];
    constructor(usersService: UsersService, authService: AuthService, configService: ConfigService);
    login(): string;
    confirm(token: string): Promise<any>;
    status(): void;
    logout(): void;
    signup(): () => {
        msg: string;
    };
    signin(): () => {
        msg: string;
    };
    jwtsession(userDto: UsernameDto): Promise<string>;
    google2fa(userDto: UsernameDto): Promise<any>;
    authenticate(res: Response, twoFaDto: twoFaDto): Promise<void>;
    test(): Promise<void>;
}
