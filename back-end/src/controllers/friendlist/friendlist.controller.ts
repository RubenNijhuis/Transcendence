// Nestjs
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

// DTO
import { CreateFriendsDto } from "src/dtos/friendlist/create-friend.dto";

// Types
import { FriendList } from "src/entities";

// Service
import { FriendlistService } from "src/services/friendlist/friendlist.service";

// DB
import { DeleteResult } from "typeorm";

////////////////////////////////////////////////////////////

@Controller("friends")
export class FriendlistController {
  constructor(private readonly friendlistService: FriendlistService) {}

  @Get("getfriends/:username")
  async getfriends(@Param('username') username: string) {
    try {
      const friendsList = await this.friendlistService.getFriends(
        username
      );

      return friendsList;
    } catch (err) {
      throw err;
    }
  }

  @Get("isFriend/:username/:friendname")
  async getfriend(@Param("username") username: string, @Param("friendname") friendname: string): Promise<string> {
    try {
      const getFriendResp: string = await this.friendlistService.isFriend(
        username,
        friendname
      );

      return getFriendResp;
    } catch (err) {
      throw err;
    }
  }

  // @Get("checkFriend")
  // async isfriend(@Param("username") username: string, @Param("friendname") friendname: string): Promise<boolean> {
  //   try {
  //     const isFriendsWithProfile: boolean =
  //       await this.friendlistService.checkFriend(username, friendname);

  //     return isFriendsWithProfile;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  @Post("addfriend")
  async addfriend(
    @Body() createfriendsDto: CreateFriendsDto
  ): Promise<FriendList> {
    try {
      const addFriendResp = await this.friendlistService.addFriend(
        createfriendsDto
      );

      return addFriendResp;
    } catch (err) {
      throw err;
    }
  }

  @Post("removefriend")
  async removefriend(
    @Body() createfriendsDto: CreateFriendsDto
  ): Promise<DeleteResult> {
    try {
      const removeFriendResp = await this.friendlistService.removeFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      );

      return removeFriendResp;
    } catch (err) {
      throw err;
    }
  }
}
