import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRequestDto } from "../../dtos/friendrequest/create-request.dto";
import FriendRequests from "../../entities/friendrequest/friendrequest.entity";

@Injectable()
export class FriendrequestService {
    constructor(
        @InjectRepository(FriendRequests)
        private readonly friendlistRepository: Repository<FriendRequests>
    ) {}

    async getRequests(username: string): Promise<FriendRequests[]> {
        const friends = await this.friendlistRepository
            .createQueryBuilder('friend_requests')
            .where('requested = :username', { username })
            .getMany();
        return friends;
    }

    async sendRequest(createrequestDto: CreateRequestDto) {
        const newEntry = this.friendlistRepository.create(createrequestDto);

        return this.friendlistRepository.save(newEntry);
    }

    async removeRequest(username: string, requested: string) {
        return this.friendlistRepository
            .createQueryBuilder('friend_requests')
            .delete()
            .from('friend_list')
            .where('users = :username', { username })
            .andWhere('requested = :requested', { requested })
            .execute()
    }
}
