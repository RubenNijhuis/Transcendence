import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req
} from "@nestjs/common";
import { Request } from "express";
import { CreateRecordDto } from "src/dtos/matchhistory/create-record.dto";
import { User } from "src/entities";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

import { MatchHistoryService } from "src/services/matchhistory/matchhistory.service";

@Controller("matchhistory")
@UseGuards(AccessTokenGuard)
export class MatchHistoryController {
  constructor(private readonly matchHistoryService: MatchHistoryService) {}

  @Get()
  async getAllMessages() {
    return await this.matchHistoryService.getAllMatches();
  }

  @Get("getmatches")
  async getMatchByUserID(@Req() req: Request): Promise<MatchHistory[]> {
    try {
      const profile: User = req.user["profile"];
      return await this.matchHistoryService.findMatchesByUserId(profile.uid);
    } catch (error) {
      throw error;
    }
  }

  @Post("createRecord")
  async createRecord(@Body() dto: CreateRecordDto) {
    try {
      const ret = await this.matchHistoryService.createRecord(
        dto.playerOne,
        dto.playerTwo,
        dto.scoreOne,
        dto.scoreTwo,
        dto.scoreType,
        dto.gameType
      );
      return ret;
    } catch (error) {
      throw error;
    }
  }
}
