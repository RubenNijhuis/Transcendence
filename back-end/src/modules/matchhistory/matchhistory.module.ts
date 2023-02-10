import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchHistoryController } from "src/controllers/matchhistory/matchhistory.controller";
import MatchHistory from "src/entities/matchhistory/matchhistory.entity";
import { MatchHistoryService } from "src/services/matchhistory/matchhistory.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([MatchHistory]),
    forwardRef(() => UserModule)
  ],
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService],
  exports: [MatchHistoryService]
})
export class MatchHistoryModule {}
