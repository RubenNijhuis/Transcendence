import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { BlocklistService } from "src/services/blocklist/blocklist.service";
import { BlockListController } from "../../controllers/blocklist/blocklist.controller";
import BlockList from "../../entities/blocklist/blocklist.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([BlockList]),
    UserModule,
  ],
  controllers: [BlockListController],
  providers: [BlocklistService],
  exports: [BlocklistService]
})
export class BlockListModule {}
