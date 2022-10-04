import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageController } from "src/controllers/message/message.controller";
import { RecordController } from "src/controllers/records/record.controller";
import { Record } from "src/entities/records/record.entity"
import { MessageService } from "src/services/message/message.service";
import { RecordService } from "src/services/records/record.service";

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService]
})
export class MessageModule {}
