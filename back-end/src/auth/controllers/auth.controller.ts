import { Body, Controller, Get, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ADDRCONFIG } from 'dns';
import { Response } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/guard';
import { User } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/create-users.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService) {}

  @Get('login')
  @UseGuards(FortyTwoAuthGuard)
  login(){}

  @Post('test')
  async test(@Res() userDto: CreateUserDto) {
    console.log("jwt test:");
    console.log(this.authService.login(userDto)); //I still need to make sure this then gets saved and used with right guards
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

}


