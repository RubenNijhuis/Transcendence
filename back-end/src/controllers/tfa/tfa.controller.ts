import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { Response } from "express";
import { TfaService } from "src/services/tfa/tfa.service";
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";
import { UsernameDto } from "src/dtos/auth/username.dto";
import { TfaDto } from "src/dtos/auth/tfa.dto";

@Controller("tfa")
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  @Post("google2fa")
  @UseGuards(Jwt2faStrategy)
  async google2fa(@Body() userDto: UsernameDto) {
    try {
      const res = await this.tfaService.generateTfaSecret(userDto);
      console.log(res);
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
    res.sendStatus(200);
  }
}
