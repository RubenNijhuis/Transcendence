import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { BlockList, User } from "src/entities";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { UserService } from "src/services/user/user.service";
import { DeleteResult } from "typeorm";
import { CreateBlockDto } from "../../dtos/blocklist/create-blocklist.dto";

@Controller("blocklist")
@UseGuards(AccessTokenGuard)
export class BlockListController {
  constructor(private readonly blocklistService: BlocklistService) {}

  @Get("getBlocked")
  async getBlocked(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];
      const blockedList = await this.blocklistService.getBlocked(
        profile.username
      );

      return await this.blocklistService.filterBlocklist(
        profile.username,
        blockedList
      );
    } catch (error) {
      throw error;
    }
  }

  @Get("isBlock/:blocked")
  async getBlock(
    @Param("blocked") blocked: string,
    @Req() req: Request
  ): Promise<boolean> {
    try {
      const profile: User = req.user["profile"];

      const isBlocked: boolean = await this.blocklistService.isBlock(
        profile.username,
        blocked
      );

      return isBlocked;
    } catch (error) {
      throw error;
    }
  }

  @Post("addBlock/:block")
  async addBlock(
    @Param("block") block: string,
    @Req() req: Request
  ): Promise<BlockList> {
    try {
      const profile: User = req.user["profile"];
      const addblock: BlockList = await this.blocklistService.blockPerson(
        profile.username,
        block
      );

      return addblock;
    } catch (error) {
      throw error;
    }
  }

  @Post("unBlock")
  async unBlock(@Body() createBlockDto: CreateBlockDto): Promise<DeleteResult> {
    try {
      const unblock: DeleteResult = await this.blocklistService.unblockPerson(
        createBlockDto.username,
        createBlockDto.blockname
      );

      return unblock;
    } catch (error) {
      throw error;
    }
  }
}
