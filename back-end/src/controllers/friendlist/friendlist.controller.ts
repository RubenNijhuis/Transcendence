// Nestjs
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UsernameDto } from "src/dtos/auth";

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

  @Get("getFriends/:username")
  async getFriends(@Param('username') username: string) {
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
  async isFriend(@Param("username") username: string, @Param("friendname") friendname: string): Promise<boolean> {
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

  @Post("addFriend")
  async addFriend(
    @Body() createfriendsDto: CreateFriendsDto
  ): Promise<FriendList> {
    try {
      const addFriendResp: FriendList = await this.friendlistService.addFriend(
        createfriendsDto
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
      const removeFriendResp: DeleteResult = await this.friendlistService.removeFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      );

      return removeFriendResp;
    } catch (err) {
      throw err;
    }
  }
  
  @Post("removeAllFriends")
  async removeAllFriends(
    @Body() usernameDto: UsernameDto
  ): Promise<DeleteResult> {
    try {
      const removeFriendResp: DeleteResult = await this.friendlistService.removeAllFriends(
        usernameDto.username,
      );

      return removeFriendResp;
    } catch (err) {
      throw err;
    }
  }
}
