import { UsersService } from 'src/users/users.service';
import { MailDto } from '../dto/mail.dto';
import { ConfigService } from '@nestjs/config';
declare const Jwt2faStrategy_base: new (...args: any[]) => any;
export declare class Jwt2faStrategy extends Jwt2faStrategy_base {
    private readonly userService;
    private readonly configService;
    constructor(userService: UsersService, configService: ConfigService);
    validate(payload: MailDto): Promise<import("../../typeorm").User>;
}
export {};
