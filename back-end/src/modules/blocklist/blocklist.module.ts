// Nestjs
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { User } from "src/entities";
import BlockList from "../../entities/blocklist/blocklist.entity";

// Blocklist
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { BlockListController } from "../../controllers/blocklist/blocklist.controller";

// User module
import { UserModule } from "../user/user.module";

///////////////////////////////////////////////////////////

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([BlockList]),
    UserModule
  ],
  controllers: [BlockListController],
  providers: [BlocklistService],
  exports: [BlocklistService]
})
export class BlockListModule {}
