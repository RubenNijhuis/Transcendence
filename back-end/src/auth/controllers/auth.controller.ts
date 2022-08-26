import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ADDRCONFIG } from 'dns';
import { Response } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/guard';
import { User } from 'src/typeorm';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(FortyTwoAuthGuard)
  login() {}

  @Get('42/callback')
  @UseGuards(FortyTwoAuthGuard)
  redirect(@Res() res: Response) {
    res.sendStatus(200);
  }

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}

  constructor (private authService: AuthService) {}

  @Post('singup')
  signup() {
    return this.authService.signup;
  }

  @Post('singin')
  signin() {
    return this.authService.signin;
  }

}


