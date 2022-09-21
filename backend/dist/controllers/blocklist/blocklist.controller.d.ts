import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { CreateBlockDto } from "../../dtos/blocklist/create-blocklist.dto";
export declare class BlockListController {
    private readonly blocklistService;
    constructor(blocklistService: BlocklistService);
    getblocked(username: any): Promise<import("../../entities").BlockList[]>;
    getblock(createBlockDto: CreateBlockDto): Promise<import("../../entities").BlockList>;
    addblock(createBlockDto: CreateBlockDto): Promise<import("../../entities").BlockList>;
    unblock(createBlockDto: CreateBlockDto): Promise<import("typeorm").DeleteResult>;
}
