import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendList } from "src/entities";
import { CreateFriendsDto } from "../../dtos/friendlist/create-friend.dto";
import { errorHandler } from "src/utils/errorhandler/errorHandler";

@Injectable()
export class FriendlistService {
  constructor(
    @InjectRepository(FriendList)
    private readonly friendlistRepository: Repository<FriendList>
  ) {}

  private filterOutput(friends: FriendList[]) {
    const filteredFriends: string[] = [];

    for (let i = 0; i < friends.length; i++) {
      filteredFriends.push(friends[i].friendname)
    }
    return filteredFriends;
  }

  async getFriends(username: string): Promise<string[]> {
    const friends: FriendList[] = await this.friendlistRepository
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

    return this.friendlistRepository.save(newEntry);
  }

  async removeFriend(username: string, friendname: string) {
    return this.friendlistRepository
      .createQueryBuilder("friend_list")
      .delete()
      .from("friend_list")
      .where("username = :username", { username })
      .andWhere("friends = :friendname", { friendname })
      .execute();
  }
}
