import {
    Body,
    Controller,
    UsePipes,
    ValidationPipe,
    Get,
    Post,
    Query,
    Param
  } from "@nestjs/common";
import { CreateRecordDto } from "src/dtos/matchhistory/create-record.dto";

import { MatchHistoryService } from "src/services/matchhistory/matchhistory.service";

  @Controller("matchhistory")
  export class MatchHistoryController {
    constructor(private readonly matchHistoryService: MatchHistoryService) {}

    @Get()
    async getAllMessages() {
      return await this.matchHistoryService.getAllMatches();
    }

    @Get("getmatches")
    async getMatchByUserID(@Param("uid") uid: string) { //TODO: it no workie just yet
      console.log("uid: ", uid);
      try {
        return await this.matchHistoryService.findMatchesByUserId(uid);
      } catch (error) {
        throw error;
      }
    }

    @Post("createRecord")
    async createRecord(@Body() createRecordDto: CreateRecordDto) {
      try {
        await this.matchHistoryService.createRecord(createRecordDto);
        const ret = { message: "Record set !" };
        return ret;
      } catch (error) {
        throw error;
      }
    }
  }