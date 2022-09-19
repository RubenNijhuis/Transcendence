import { Module } from '@nestjs/common';
import { ChatController } from '../../controllers/message/message.controller'
import { ChatService } from '../../services/message/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm';
import { GroupModule } from '../group/groups.module';

@Module({
	imports: [TypeOrmModule.forFeature([Chat]), GroupModule],
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService]
})
export class MessageModule {}