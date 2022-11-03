import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateRequestDto } from "src/dtos/friendrequest/create-request.dto";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

@Controller("friendrequest")
export class FriendRequestController {
  constructor(
    private readonly friendrequestService: FriendrequestService) {}

  @Get("getRequest/:username")
  async getrequests(@Param("username") username: string) {
    try {
      return await this.friendrequestService.getRequests(username);
    } catch (err) {
      throw err;
    }
  }

  @Get("getRequested/:username")
  async getrequested(@Param("username") username: string) {
    try {
      return await this.friendrequestService.getRequested(username);
    } catch (err) {
      throw err;
    }
  }

  @Get("isRequested/:username/:requested")
  async isRequested(@Param("username") username: string, @Param("requested") requested: string): Promise<boolean> {
    try {
      return await this.friendrequestService.isRequested(username, requested);
    } catch (err) {
      throw err;
    }
  }

  @Post("sendRequest")
  async sendrequest(@Body() requestDto: CreateRequestDto) {
    try {
      return await this.friendrequestService.sendRequest(requestDto);
    } catch (err) {
      throw err;
    }
  }

  @Post("removeRequest")
  async removerequest(@Body() requestDto: CreateRequestDto) {
    try {
      return await this.friendrequestService.removeRequest(
        requestDto.username,
        requestDto.requested
      );
    } catch (err) {
      throw err;
    }
  }
}
