import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlockListController } from "./blocklist.controller";
import BlockList from "./blocklist.entity";
import { BlocklistService } from "./blocklist.service";

@Module({
    imports: [TypeOrmModule.forFeature([BlockList])],
    controllers: [BlockListController],
    providers: [BlocklistService],
})
export class BlockListModule {}