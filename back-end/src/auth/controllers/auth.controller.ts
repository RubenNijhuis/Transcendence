import { Body, Controller, Get, HttpCode, Post, Res, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ADDRCONFIG } from 'dns';
import { Response } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/guard';
import { User } from 'src/typeorm';
import { twofadto } from 'src/users/dtos/2fa.dto';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { MailDto } from 'src/users/dtos/mail.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthService } from '../services/auth.service';
import { Jwt2faStrategy } from '../strategies/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Get('login')
  @UseGuards(FortyTwoAuthGuard)
  login(){}

  @UseGuards(Jwt2faStrategy)
  @Post('test')
  @UsePipes(ValidationPipe)
  async test(@Body() mailDto: MailDto) {
    console.log("jwt test:");
    console.log(this.authService.login(mailDto)); //I still need to make sure this then gets saved and used with right guards
}

  @Get('42/callback')
  @UseGuards(FortyTwoAuthGuard)
  redirect(@Res() res: Response) {
    res.sendStatus(200);
  }

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}


  @Post('singup')
  signup() {
    return this.authService.signup;
  }

  @Post('singin')
  signin() {
    return this.authService.signin;
  }

  @Post('google2fa')
  @UseGuards(Jwt2faStrategy)
  @UsePipes(ValidationPipe)
  async google2fa(@Body() mailDto: MailDto) { 
      try {
          const res = await this.authService.generateTwoFactorAuthenticationSecret(mailDto);
          console.log(res);
      }
      catch (error) {
          return error;
      }
  }

  @Post('google2fa/authenticate')
  @UseGuards(Jwt2faStrategy)
  async authenticate(@Res() res: Response, @Body() twofadto: twofadto) {
  const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twofadto);
  if (isCodeValid === false) {
      throw new UnauthorizedException('Wrong authentication code');
   }
  res.sendStatus(200);
  }


}


