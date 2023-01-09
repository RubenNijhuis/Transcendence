import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req
} from "@nestjs/common";
import { CreateRequestDto } from "src/dtos/friendrequest/create-request.dto";
import { User } from "src/entities";
import { AccessTokenGuard } from "src/guards/accessToken.guard";
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

// Requests
import { Request } from "express";

////////////////////////////////////////////////////////////

@Controller("friendrequest")
@UseGuards(AccessTokenGuard)
export class FriendRequestController {
  constructor(private readonly friendrequestService: FriendrequestService) {}

  //////////////////////////////////////////////////////////

  @Get("getRequest/:username")
  async getrequests(@Param("username") username: string) {
    try {
      return await this.friendrequestService.getRequests(username);
    } catch (err) {
      throw err;
    }
  }

  @Get("getRequested")
  async getrequested(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];

      return await this.friendrequestService.getRequested(profile.username);
    } catch (err) {
      throw err;
    }
  }

  @Get("isRequested/:requested")
  async isRequested(
    @Req() req: Request,
    @Param("username") username: string,
    @Param("requested") requested: string
  ): Promise<boolean> {
    try {
      const profile: User = req.user["profile"];
      return await this.friendrequestService.isRequested(
        profile.username,
        requested
      );
    } catch (err) {
      throw err;
    }
  }

  @Post("sendRequest")
  async sendrequest(@Body() requestDto: CreateRequestDto) {
    try {
      return await this.friendrequestService.sendRequest(
        requestDto.username,
        requestDto.requested
      );
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
