import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { TfaService } from "src/services/tfa/tfa.service";
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { TfaDto } from "src/dtos/auth/tfa.dto";
import { Request, Response } from "express";
import { User } from "src/entities";

@Controller("tfa")
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  @Post("google2fa")
  @UseGuards(Jwt2faStrategy)
  async google2fa(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];
      const res = await this.tfaService.generateTfaSecret(profile.uid);
      console.log("Google 2FA: ", res);
      return res;
    } catch (error) {
      return error;
    }
  }

  @Post("google2fa/authenticate")
  @UseGuards(Jwt2faStrategy)
  async authenticate(@Res() res: Response, @Body() tfaDto: TfaDto) {
    const isCodeValid = await this.tfaService.isTfaValid(tfaDto);
    if (isCodeValid === false) {
      throw new UnauthorizedException("Wrong authentication code");
    }
    return res.status(HttpStatus.OK).send();
  }
}
