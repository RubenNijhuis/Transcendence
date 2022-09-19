import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockListController } from "../../controllers/blocklist/blocklist.controller";
import BlockList from "../../entities/blocklist/blocklist.entity";
import { BlocklistService } from "../../services/index";

@Module({
    imports: [TypeOrmModule.forFeature([BlockList])],
    controllers: [BlockListController],
    providers: [BlocklistService],
})
export class BlockListModule {}