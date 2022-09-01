import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { MailDto } from 'src/users/dtos/mail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { twofadto } from 'src/users/dtos/2fa.dto';
import e from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService
    )  {}

    async validateUser(userDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.findUsersByIntraId(userDto.uid);
    if (!user)
      return await this.createUser(userDto);
    return user;
    }

    private async createUser(userDto: CreateUserDto): Promise<any> {
    return await this.usersService.createUser(userDto);
    }

    findUser() {
        throw new Error('Method not implemented.');
    }
    
    signup() {
        return { msg: 'I have signed up' }
    }

    signin() {
        return { msg: 'I have signed in' }
    }

    async addjwttoken(mailDto: MailDto, token: string) {
        const ret = await this.usersService.findUserByUsername(mailDto.username);

        if (ret.jwtsession_token === "")
            this.usersService.addsessiontoken(mailDto, token);
    }

    async login(mailDto: MailDto) {
        const payload = {
            email: mailDto.email,
        };
        const ret = this.jwtService.sign(payload);
        this.addjwttoken(mailDto, ret);

        return ret;
        }

    async isTwoFactorAuthenticationCodeValid(Twofadto: twofadto) {
        const ret = await this.usersService.findUserByUsername(Twofadto.username);
        console.log(Twofadto.twoFactorAuthenticationCode);
        console.log(ret.twoFactorAuthenticationSecret);
        
        const res = authenticator.check(
          Twofadto.twoFactorAuthenticationCode,
          ret.twoFactorAuthenticationSecret,
        );
        console.log(res);
        return res;
    }

    async generateTwoFactorAuthenticationSecret(mailDto: MailDto) {
        const ret = await this.usersService.findUserByUsername(mailDto.username);
        
    if (!ret || ret.isTwoFactorAuthenticationEnabled === false ) {
        throw TypeError;
    }
        var secret = "";
        if (ret.twoFactorAuthenticationSecret == "2FA_SECRET")
        {
            secret = authenticator.generateSecret();
            console.log("secret:");
            console.log(secret);
            this.usersService.update2fasecret(mailDto, secret);
        }
        else
        {
            secret = ret.twoFactorAuthenticationSecret;
        }
        const otpauthUrl = authenticator.keyuri(mailDto.email, 'AUTH_APP_NAME', secret);
        
        console.log("otapathurl:");
        console.log(otpauthUrl);
    
        console.log("todataurl:");
        const res = toDataURL(otpauthUrl);
    
        return(toDataURL(otpauthUrl));
    }
}
