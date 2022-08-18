import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { OAuthGuard } from 'src/auth/guard/auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(OAuthGuard)
  login() {
    return;
  }

  /*
    GET /auth/42/callback (http://127.0.0.1:3000/auth/42/callback)
  */
  @Get('42/callback')
  redirect(@Res() res: Response) {
    res.sendStatus(200);
  }

  @Get('status')
  status() {}

  @Get('logout')
  logout() {}
}
