import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { Request, Response } from "express";

// Service
import { TfaService } from "src/services/tfa/tfa.service";

// Strategy
import { Jwt2faStrategy } from "src/middleware/jwt/jwt.strategy";

// dto
import { TfaDto } from "src/dtos/auth/tfa.dto";

// Entities
import { User } from "src/entities";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

////////////////////////////////////////////////////////////

@Controller("tfa")
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  ////////////////////////////////////////////////////////

  @UseGuards(AccessTokenGuard)
  @UseGuards(Jwt2faStrategy)
  @Get("google2fa")
  async google2fa(@Req() req: Request) {
    const profile: User = req.user["profile"];
    try {
      const res = await this.tfaService.generateTfaSecret(profile.uid);
      console.log("Google 2FA: ", res);
      return res;
    } catch (error) {
      return error;
    }
  }

  @Post("google2fa/authenticate")
  @UseGuards(AccessTokenGuard)
  @UseGuards(Jwt2faStrategy)
  async authenticate(@Res() res: Response, @Body() tfaDto: TfaDto) {
    const isCodeValid = await this.tfaService.isTfaValid(tfaDto);
    if (isCodeValid === false) {
      throw new UnauthorizedException("Wrong authentication code");
    }
    return res.status(HttpStatus.OK).send();
  }
}
