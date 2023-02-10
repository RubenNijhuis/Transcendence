import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  forwardRef,
  Inject
} from "@nestjs/common";
import { CreateRecordDto } from "src/dtos/matchhistory/create-record.dto";
import { User } from "src/entities";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

import { MatchHistoryService } from "src/services/matchhistory/matchhistory.service";
import { UserService } from "src/services/user/user.service";

@Controller("matchhistory")
@UseGuards(AccessTokenGuard)
export class MatchHistoryController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly matchHistoryService: MatchHistoryService
  ) {}

  @Get()
  async getAllMessages() {
    return await this.matchHistoryService.getAllMatches();
  }

  @Get("getmatches/:username")
  async getMatchByUserID(
    @Param("username") username: string
  ): Promise<MatchHistory[]> {
    try {
      const user: User = await this.userService.findUserByUsername(username);
      return await this.matchHistoryService.findMatchesByUserId(user.uid);
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
        dto.scoreType
      );
      return ret;
    } catch (error) {
      throw error;
    }
  }
}
