import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageController } from "src/controllers/message/message.controller";
import { RecordController } from "src/controllers/record/record.controller";
import { Record } from "src/entities/record/record.entity"
import { MessageService } from "src/services/message/message.service";
import { RecordService } from "src/services/record/record.service";
import { GroupModule } from "../group/group.module";
import { MessageModule } from "../message/message.module";

@Module({
  imports: [TypeOrmModule.forFeature([Record]), GroupModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})
export class RecordModule {}
