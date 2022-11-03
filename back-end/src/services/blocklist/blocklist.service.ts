import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import BlockList from "../../entities/blocklist/blocklist.entity";
import { CreateBlockDto } from "../../dtos/blocklist/create-blocklist.dto";
import { UserService } from "../user/user.service";
import { FriendList } from "src/entities";

@Injectable()
export class BlocklistService {
    inject: [UserService]
    constructor(
        @InjectRepository(BlockList)
        private readonly blocklistRepository: Repository<BlockList>,
        private readonly userService: UserService
    ) {}

    private async filterOutput(blocked: BlockList[]) {
        const filteredFriends = [];
    
        for (const block of blocked) {
          filteredFriends.push(block.blockname);
        }
        const ret = await this.userService.getUsersOnUsernames(filteredFriends);
        return ret;
      }

    async getBlocked(username: string) {
        const blocked: BlockList[] = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .getMany();
        return this.filterOutput(blocked);
    }

    async isBlock(username: string, blockedname: string): Promise<boolean> {
        var ret: boolean = false;

        const blocked = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .andWhere('blockname = :blocked', { blockedname })
            .getOne();
        
        if (blocked)
            ret = true;
        return ret;
    }

    async blockPerson(createBlockDto: CreateBlockDto): Promise<BlockList> {
        const newEntry: BlockList = this.blocklistRepository.create(createBlockDto);
        const saveResponse: BlockList = await this.blocklistRepository.save(newEntry);

        return saveResponse;
    }

    async unblockPerson(username: string, toblock: string): Promise<DeleteResult> {
        const removeFriendResponse: DeleteResult = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .delete()
            .from('block_list')
            .where('username = :username', { username })
            .andWhere('blockname = :toblock', { toblock })
            .execute()
        return removeFriendResponse;
    }
}