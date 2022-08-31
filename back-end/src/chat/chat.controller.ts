import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatService } from "src/chat/chat.service";
import { CreateChatDto } from './dtos/create-chat.dto';
 
@Controller("chat")
export class ChatController {
    constructor(private readonly ChatService: ChatService) {}

    @Get()
    getAllMessages() {
        return this.ChatService.getAllMessages();
    }
    @Get('id/:groupid')
    async getAllMessagesByGroupId(group_id: string) {
        const ret = await this.ChatService.getAllMessagesByGroupId(group_id);
      return ret;
    }
    @Post('createChat')
    async createChat(@Body() CreateChatDto: CreateChatDto) {
        try {
            const chat = await this.ChatService.createChat(CreateChatDto);
            const ret = { message: chat.content };
            return ret;
        } catch (error) {
            return error;
        }
    }
}