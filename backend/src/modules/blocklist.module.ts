import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockListController } from "../controllers/blocklist.controller";
import BlockList from "../entities/blocklist.entity";
import { BlocklistService } from "../services/blocklist.service";

@Module({
    imports: [TypeOrmModule.forFeature([BlockList])],
    controllers: [BlockListController],
    providers: [BlocklistService],
})
export class BlockListModule {}