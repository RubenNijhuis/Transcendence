import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Put
} from "@nestjs/common";

import { RecordService } from "src/services/record/record.service";
import Record from "src/entities/record/record.entity";
import { BanUserDto } from "src/dtos/record/ban-user.dto";

@Controller("record")
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get()
  async getAllRecords() {
    return await this.recordService.getAllRecords();
  }

  @Post("banUser")
  async banUser(@Body() banUserDto: BanUserDto) {
    try {
      await this.recordService.banUser(banUserDto);
      const ret = { message: "User banned!" };
      return ret;
    } catch (error) {
      throw error;
    }
  }
}

