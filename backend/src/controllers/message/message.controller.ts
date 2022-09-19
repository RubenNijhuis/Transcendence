import { Body, Controller, UsePipes, ValidationPipe, Delete, Get, Query , Param, Post, Put } from '@nestjs/common';
import { ChatService } from "src/groups/chat/chat.service";
import { CreateChatDto } from '../../dtos/chat/create-message.dto';
 
@Controller("message")
export class MessageController {
    constructor(private readonly ChatService: ChatService) {}

    @Get()
    getAllMessages() {
        return this.ChatService.getAllMessages();
    }

    @Get('id/group_id?')
    async getAllMessagesByGroupId(@Query('group_id') group_id) {
        const ret = await this.ChatService.getAllMessagesByGroupId(group_id);
      return ret;
    }

    @Post('createMessage')
    @UsePipes(ValidationPipe)
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