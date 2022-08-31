import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateRequestDto } from "./dtos/create-request.dto";
import { FriendrequestService } from "./friendrequest.service";

@Controller('friendrequest')
export class FriendRequestController {
    constructor(private readonly friendrequestService: FriendrequestService) {}

    @Get('getrequests?')
    async getrequests(@Query('username') username) {
        await this.friendrequestService.getRequests(username);
    }

    @Post('sendrequest')
    async senrequest(@Body() requestDto: CreateRequestDto) {
        await this.friendrequestService.sendRequest(requestDto);
    }

    @Post('removerequest')
    async removerequest(@Body() requestDto: CreateRequestDto) {
        await this.friendrequestService.removeRequest(requestDto.username, requestDto.requested);
    }
}