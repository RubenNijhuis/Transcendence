import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req
} from "@nestjs/common";

// Dto
import { CreateRequestDto } from "src/dtos/friendrequest/create-request.dto";

// Entities
import { User } from "src/entities";

// Guards
import { AccessTokenGuard } from "src/guards/accessToken.guard";

// Service
import { FriendrequestService } from "src/services/friendrequest/friendrequest.service";

// Requests
import { Request } from "express";

////////////////////////////////////////////////////////////

@Controller("friendrequest")
@UseGuards(AccessTokenGuard)
export class FriendRequestController {
  constructor(private readonly friendrequestService: FriendrequestService) {}

  //////////////////////////////////////////////////////////

  @Get("getRequest")
  async getrequests(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];
      return await this.friendrequestService.filterFriendrequests(
        profile.username,
        await this.friendrequestService.getRequests(profile.username)
      );
    } catch (err) {
      throw err;
    }
  }

  @Get("getRequested")
  async getrequested(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];

      return await this.friendrequestService.filterFriendrequests(
        profile.username,
        await this.friendrequestService.getRequested(profile.username)
      );
    } catch (err) {
      throw err;
    }
  }

  @Get("isRequested/:requested")
  async isRequested(
    @Req() req: Request,
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
