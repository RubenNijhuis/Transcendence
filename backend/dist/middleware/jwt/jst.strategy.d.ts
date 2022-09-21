import { UserService } from 'src/services/user/user.service';
import { MailDto } from '../../dtos/auth/mail.dto';
import { ConfigService } from '@nestjs/config';
declare const Jwt2faStrategy_base: new (...args: any[]) => any;
export declare class Jwt2faStrategy extends Jwt2faStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: MailDto): Promise<import("../../entities").User>;
}
export {};
