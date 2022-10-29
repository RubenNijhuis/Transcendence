// Nestjs
import { Body, Controller, Get, Post, Query } from "@nestjs/common";

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

  @Get("getfriends?")
  async getfriends(@Query("username") username: string): Promise<string[]> {
    try {
      const friendsList: string[] = await this.friendlistService.getFriends(
        username
      );

      return friendsList;
    } catch (err) {
      throw err;
    }
  }

  @Post("getfriend")
  async getfriend(@Body() createfriendsDto: CreateFriendsDto): Promise<string> {
    try {
      const getFriendResp: string = await this.friendlistService.getFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      );

      return getFriendResp;
    } catch (err) {
      throw err;
    }
  }

  @Post("isfriend")
  async isfriend(@Body() createfriendsDto: CreateFriendsDto): Promise<boolean> {
    try {
      const { username, friendname } = createfriendsDto;

      const isFriendsWithProfile: boolean =
        await this.friendlistService.isFriend(username, friendname);

      return isFriendsWithProfile;
    } catch (err) {
      throw err;
    }
  }

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
