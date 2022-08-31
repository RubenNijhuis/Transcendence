import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FriendList } from 'src/typeorm';
import { CreateFriensdDto } from "./dtos/create-friends.dto";

@Injectable()
export class FriendlistService {
    constructor(
        @InjectRepository(FriendList)
        private readonly friendlistRepository: Repository<FriendList>
    ) {}

    //getfriends
    async getFriends(username: string): Promise<FriendList[]> {
        const friends = await this.friendlistRepository
            .createQueryBuilder('friend_list')
            .where('users = :username', { username })
            .getMany();
        return friends;
    }

    //getfriend
    async getFriend(username: string, friendname: string): Promise<FriendList> {
        const friend = await this.friendlistRepository
            .createQueryBuilder('friend_list')
            .where('users = :username', { username })
            .andWhere('friends = :friendname', { friendname })
            .getOne();
        return friend;
    }

    async isFriend(username: string, friendname: string): Promise<boolean> {
        return (!(await this.getFriend(username, friendname) === null) 
            || !(await this.getFriend(friendname, username) === null))
    }

    //addfriend
    async addFriend(createfriendsDto: CreateFriensdDto) {
        const newEntry = this.friendlistRepository.create(createfriendsDto);

        return this.friendlistRepository.save(newEntry);
    }

    //removefriend
    async removeFriend(username: string, friendname: string) {
        return this.friendlistRepository
            .createQueryBuilder('friend_list')
            .delete()
            .from('friend_list')
            .where('users = :username', { username })
            .andWhere('friends = :friendname', { friendname })
            .execute()
    }
}
