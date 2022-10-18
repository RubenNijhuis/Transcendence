import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateFriensdDto } from "src/dtos/friendlist/create-friend.dto";
import { FriendlistService } from "src/services/friendlist/friendlist.service";

@Controller("friends")
export class FriendlistController {
  constructor(private readonly friendlistService: FriendlistService) {}

  @Get("getfriends?")
  async getfriends(@Query("username") username: string) {
    try {
      return await this.friendlistService.getFriends(username);
    } catch (error) {
      throw error;
    }
  }

  @Post("getfriend")
  async getfriend(@Body() createfriendsDto: CreateFriensdDto) {
    try {
      return await this.friendlistService.getFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      ); 
    } catch (error) {
      throw error;
    }
  }

  @Post("isfriend")
  async isfriend(@Body() createfriendsDto: CreateFriensdDto) {
    try {
      return await this.friendlistService.isFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      );
    } catch (error) {
      throw error;
    }
  }

  @Post("addfriend")
  async addfriend(@Body() createfriendsDto: CreateFriensdDto) {
    try {
      return await this.friendlistService.addFriend(createfriendsDto);
    } catch (error) {
      throw error;
    }
  }

  @Post("removefriend")
  async removefriend(@Body() createfriendsDto: CreateFriensdDto) {
    try {
      return await this.friendlistService.removeFriend(
        createfriendsDto.username,
        createfriendsDto.friendname
      );
    } catch (error) {
      throw error;
    }
  }
}
