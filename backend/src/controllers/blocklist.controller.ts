import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { BlocklistService } from "../services/blocklist.service";
import { CreateBlockDto } from "../users/blocklist/dtos/create-blocklist.dto";

@Controller('block')
export class BlockListController {
    constructor(private readonly blocklistService: BlocklistService) {}

    @Get('getblocked?')
    async getblocked(@Query('username') username) {
        return await this.blocklistService.getBlocked(username);
    }

    @Post('getblock')
    async getblock(@Body() createBlockDto: CreateBlockDto) {
        return await this.blocklistService.getBlock(createBlockDto.username, createBlockDto.blocked);
    }

    @Post('addblock')
    async addblock(@Body() createBlockDto: CreateBlockDto) {
        return await this.blocklistService.blockPerson(createBlockDto);
    }

    @Post('unblock')
    async unblock(@Body() createBlockDto: CreateBlockDto) {
        return await this.blocklistService.unblockPerson(createBlockDto.username, createBlockDto.blocked);
    }
}