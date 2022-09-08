import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BlockList from "./blocklist.entity";
import { CreateBlockDto } from "./dtos/create-blocklist.dto";

@Injectable()
export class BlocklistService {
    constructor(
        @InjectRepository(BlockList)
        private readonly blocklistRepository: Repository<BlockList>
    ) {}

    async getBlocked(username: string): Promise<BlockList[]> {
        const blocked = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .getMany();
        return blocked;
    }

    async getBlock(username: string, blockedname: string): Promise<BlockList> {
        const blocked = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .andWhere('blockname = :blocked', { blockedname })
            .getOne();
        return blocked;
    }

    async isBlocked(username: string, friendname: string): Promise<boolean> {
        return (!(await this.getBlock(username, friendname) === null) 
            || !(await this.getBlock(friendname, username) === null))
    }

    async blockPerson(createBlockDto: CreateBlockDto) {
        const newEntry = this.blocklistRepository.create(createBlockDto);

        return this.blocklistRepository.save(newEntry);
    }

    async unblockPerson(username: string, toblock: string) {
        return this.blocklistRepository
            .createQueryBuilder('block_list')
            .delete()
            .from('block_list')
            .where('username = :username', { username })
            .andWhere('blockname = :toblock', { toblock })
            .execute()
    }
}