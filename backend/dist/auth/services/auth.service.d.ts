import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { twofadto } from "../dto/2fa.dto";
import { UsernameDto } from "../dto/username.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(intraId: string): Promise<any>;
    private createUser;
    findUser(): void;
    signup(): {
        msg: string;
    };
    signin(): {
        msg: string;
    };
    addjwttoken(usernameDto: UsernameDto, token: string): Promise<void>;
    login(usernameDto: UsernameDto): Promise<string>;
    isTwoFactorAuthenticationCodeValid(Twofadto: twofadto): Promise<boolean>;
    generateTwoFactorAuthenticationSecret(usernameDto: UsernameDto): Promise<any>;
}
