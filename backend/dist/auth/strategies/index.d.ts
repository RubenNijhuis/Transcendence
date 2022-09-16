import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AuthService } from '../services/auth.service';
declare const LocalStrategy_base: new (...args: any[]) => any;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly configService;
    private readonly httpService;
    private readonly AuthService;
    constructor(configService: ConfigService, httpService: HttpService, AuthService: AuthService);
}
export {};
