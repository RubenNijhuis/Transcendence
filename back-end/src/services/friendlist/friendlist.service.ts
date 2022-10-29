// Nestjs
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// DB
import { Repository } from "typeorm";

// Types
import { FriendList } from "src/entities";

// Dtos
import { CreateFriendsDto } from "../../dtos/friendlist/create-friend.dto";

////////////////////////////////////////////////////////////

@Injectable()
export class FriendlistService {
  constructor(
    @InjectRepository(FriendList)
    private readonly friendlistRepository: Repository<FriendList>
  ) {}

  private filterOutput(friends: FriendList[]) {
    const filteredFriends: string[] = [];

    for (const friend of friends) {
      filteredFriends.push(friend.friendname);
    }

    return filteredFriends;
  }

  async getFriends(username: string): Promise<string[]> {
    let friends: FriendList[] = [];

    friends = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username", { username })
      .getMany();

    return this.filterOutput(friends);
  }

  async getFriend(username: string, friendname: string): Promise<string> {
    const friend = await this.friendlistRepository
      .createQueryBuilder("friend_list")
      .where("username = :username", { username })
      .andWhere("friends = :friendname", { friendname })
      .getOne();

    return friend.friendname;
  }

  async isFriend(username: string, friendname: string): Promise<boolean> {
    return (
      !((await this.getFriend(username, friendname)) === null) ||
      !((await this.getFriend(friendname, username)) === null)
    );
  }

  async addFriend(createfriendsDto: CreateFriendsDto) {
    const newEntry = this.friendlistRepository.create(createfriendsDto);
    const saveResponse = this.friendlistRepository.save(newEntry);

    return saveResponse;
  }

  async removeFriend(username: string, friendname: string) {
    const removeFriendResponse = this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where("username = :username", { username })
      .andWhere("friends = :friendname", { friendname })
      .execute();

    return removeFriendResponse;
  }
}
