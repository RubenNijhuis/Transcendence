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

@UseGuards(AccessTokenGuard)
@Controller("blocklist")
export class BlockListController {
  constructor(
    private readonly blocklistService: BlocklistService,
    private readonly userService: UserService
  ) {}

  @Get("getBlocked")
  async getBlocked(@Req() req: Request) {
    try {
      const uid: string = req.user["uid"];
      const user: User = await this.userService.findUserByUid(uid);
      const blockedList = await this.blocklistService.getBlocked(user.username);

      return blockedList;
    } catch (error) {
      throw error;
    }
  }

  @Get("isBlock/:username/:blocked")
  async getBlock(
    @Param("username") username: string,
    @Param("blocked") blocked: string
  ): Promise<boolean> {
    try {
      const isBlocked: boolean = await this.blocklistService.isBlock(
        username,
        blocked
      );

      return isBlocked;
    } catch (error) {
      throw error;
    }
  }

  @Post("addBlock")
  async addBlock(@Body() createBlockDto: CreateBlockDto): Promise<BlockList> {
    try {
      const addblock: BlockList = await this.blocklistService.blockPerson(
        createBlockDto
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
