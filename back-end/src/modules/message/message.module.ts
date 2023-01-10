import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageController } from "src/controllers/message/message.controller";
import Message from "src/entities/message/message.entity";
import { MessageService } from "src/services/message/message.service";
import { GroupModule } from "../group/group.module";
import { RecordModule } from "../record/record.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ConfigModule.forRoot(),
    RecordModule,
    forwardRef(() => UserModule),
    forwardRef(() => GroupModule)
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}
