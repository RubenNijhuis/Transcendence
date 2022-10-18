import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateRequestDto } from "src/dtos/friendrequest/create-request.dto";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

@Controller("friendrequest")
export class FriendRequestController {
  constructor(private readonly friendrequestService: FriendrequestService) {}

  @Get("getrequests?")
  async getrequests(@Query("username") username: string) {
    try {
      return await this.friendrequestService.getRequests(username);
    } catch (error) {
      throw error;
    }
  }

  @Post("sendrequest")
  async sendrequest(@Body() requestDto: CreateRequestDto) {
    try {
      return await this.friendrequestService.sendRequest(requestDto);
    } catch (error) {
      throw error;
    }
  }

  @Post("removerequest")
  async removerequest(@Body() requestDto: CreateRequestDto) {
    try {
      return await this.friendrequestService.removeRequest(
        requestDto.username,
        requestDto.requested
      );
    } catch (error) {
      throw error;
    }
  }
}
