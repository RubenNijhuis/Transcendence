import { BlocklistService } from "./blocklist.service";
import { CreateBlockDto } from "./dtos/create-blocklist.dto";
export declare class BlockListController {
    private readonly blocklistService;
    constructor(blocklistService: BlocklistService);
    getblocked(username: any): Promise<import("./blocklist.entity").BlockList[]>;
    getblock(createBlockDto: CreateBlockDto): Promise<import("./blocklist.entity").BlockList>;
    addblock(createBlockDto: CreateBlockDto): Promise<import("./blocklist.entity").BlockList>;
    unblock(createBlockDto: CreateBlockDto): Promise<import("typeorm").DeleteResult>;
}
