import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm';
import { GroupModule } from '../groups.module';

@Module({
	imports: [TypeOrmModule.forFeature([Chat]), GroupModule],
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService]
})
export class ChatModule {}