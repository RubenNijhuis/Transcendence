import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageController } from "src/controllers/message/message.controller";
import Message from "src/entities/message/message.entity";
import { MessageService } from "src/services/message/message.service";
import { GroupModule } from "../group/group.module";
import { RecordModule } from "../record/record.module";

@Module({
  imports: [TypeOrmModule.forFeature([Message]), forwardRef(() => GroupModule), RecordModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
