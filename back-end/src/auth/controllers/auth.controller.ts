import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FortyTwoAuthGuard } from 'src/auth/guard';

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
}
