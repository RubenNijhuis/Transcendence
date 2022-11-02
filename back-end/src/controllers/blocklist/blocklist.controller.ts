import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { BlockList } from "src/entities";
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { CreateBlockDto } from "../../dtos/blocklist/create-blocklist.dto";

@Controller("block")
export class BlockListController {
  constructor(private readonly blocklistService: BlocklistService) {}

  @Get("getblocked/:username")
  async getblocked(@Param("username") username: string) {
    try {
      const blockedList = await this.blocklistService.getBlocked(username);

      return blockedList;
    } catch (error) {
      throw error;
    }
  }

  @Get("isBlock/:username/:blocked")
  async getblock(@Param('username') username: string, @Param('blocked') blocked: string): Promise<boolean> {
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

  @Post("addblock")
  async addblock(@Body() createBlockDto: CreateBlockDto) {
    return await this.blocklistService.blockPerson(createBlockDto);
  }

  @Post("unblock")
  async unblock(@Body() createBlockDto: CreateBlockDto) {
    return await this.blocklistService.unblockPerson(
      createBlockDto.username,
      createBlockDto.blocked
    );
  }
}
