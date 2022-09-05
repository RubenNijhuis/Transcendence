import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ADDRCONFIG } from 'dns';
import { Response } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/guard';
import { User } from 'src/typeorm';
import { ConfirmDto } from '../dto/confirm.dto';
import { AuthService } from '../services/auth.service';
import { HttpService } from '@nestjs/axios';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Get('login')
  @UseGuards(FortyTwoAuthGuard)
  login() {

  }

  // @Get('42/callback')
  // // @UseGuards(FortyTwoAuthGuard)
  // redirect(@Res() res: Response) {
  //   res.sendStatus(200);
  // }

  @Post('confirm')
  // @UseGuards(FortyTwoAuthGuard)
  confirm(@Body() confirmDto: ConfirmDto) {
    const ret = 
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

}


