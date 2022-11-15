import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { BlockList } from "src/entities";
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { DeleteResult } from "typeorm";
import { CreateBlockDto } from "../../dtos/blocklist/create-blocklist.dto";

@Controller("block")
export class BlockListController {
  constructor(private readonly blocklistService: BlocklistService) {}

  @Get("getBlocked/:username")
  async getBlocked(@Param("username") username: string) {
    try {
      const blockedList = await this.blocklistService.getBlocked(username);

      return blockedList;
    } catch (error) {
      throw error;
    }
  }

  @Get("isBlock/:username/:blocked")
  async getBlock(@Param('username') username: string, @Param('blocked') blocked: string): Promise<boolean> {
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
      const addblock: BlockList = await this.blocklistService.blockPerson(createBlockDto);

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
        createBlockDto.blocked
      );

      return unblock;
    } catch (error) {
      throw error;
    }
  }
}
