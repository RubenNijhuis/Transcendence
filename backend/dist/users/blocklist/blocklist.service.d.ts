import { Repository } from "typeorm";
import BlockList from "./blocklist.entity";
import { CreateBlockDto } from "./dtos/create-blocklist.dto";
export declare class BlocklistService {
    private readonly blocklistRepository;
    constructor(blocklistRepository: Repository<BlockList>);
    getBlocked(username: string): Promise<BlockList[]>;
    getBlock(username: string, blockedname: string): Promise<BlockList>;
    isBlocked(username: string, friendname: string): Promise<boolean>;
    blockPerson(createBlockDto: CreateBlockDto): Promise<BlockList>;
    unblockPerson(username: string, toblock: string): Promise<import("typeorm").DeleteResult>;
}
