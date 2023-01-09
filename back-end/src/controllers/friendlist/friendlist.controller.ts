// Nestjs
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

// DTO
import { CreateFriendsDto } from "src/dtos/friendlist/create-friend.dto";

// Types
import { FriendList, User } from "src/entities";
import { AccessTokenGuard } from "src/guards/accessToken.guard";

// Service
import { FriendlistService } from "src/services/friendlist/friendlist.service";

// DB
import { DeleteResult } from "typeorm";

////////////////////////////////////////////////////////////

@Controller("friends")
@UseGuards(AccessTokenGuard)
export class FriendlistController {
  constructor(private readonly friendlistService: FriendlistService) {}

  //////////////////////////////////////////////////////////

  @Get("getFriends/:username")
  async getFriends(@Req() req: Request) {
    try {
      const profile: User = req.user["profile"];
      const friendsList = await this.friendlistService.filterFriendlist(
        profile.username,
        await this.friendlistService.getFriends(profile.username)
      );
      return friendsList;
    } catch (err) {
      throw err;
    }
  }

  @Get("isFriend/:username/:friendname")
  async isFriend(
    @Param("username") username: string,
    @Param("friendname") friendname: string
  ): Promise<boolean> {
    try {
      const isFriend: boolean = await this.friendlistService.isFriend(
        username,
        friendname
      );

      return isFriend;
    } catch (err) {
      throw err;
    }
  }

  @Post("addFriend/:friendname")
  async addFriend(
    @Param("friendname") friendname: string,
    @Req() req: Request
  ): Promise<FriendList> {
    try {
      const profile: User = req.user["profile"];
      const addFriendResp: FriendList = await this.friendlistService.addFriend(
        profile.uid,
        friendname
      );

      return addFriendResp;
    } catch (err) {
      throw err;
    }
  }

  @Post("removeFriend")
  async removeFriend(
    @Body() createfriendsDto: CreateFriendsDto
  ): Promise<DeleteResult> {
    try {
      const removeFriendResp: DeleteResult =
        await this.friendlistService.removeFriend(
          createfriendsDto.username,
          createfriendsDto.friendname
        );

      return removeFriendResp;
    } catch (err) {
      throw err;
    }
  }
}
