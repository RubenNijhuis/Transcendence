import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { BlockListController } from "../../controllers/blocklist/blocklist.controller";
import BlockList from "../../entities/blocklist/blocklist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BlockList])],
  controllers: [BlockListController],
  providers: [BlocklistService]
})
export class BlockListModule {}
