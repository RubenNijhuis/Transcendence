import { Body, Controller, UsePipes, ValidationPipe, Delete, Get, Query , Param, Post, Put } from '@nestjs/common';
import { CreateMessageDto } from 'src/dtos/group';
import { MessageService } from 'src/services/message/message.service';
 
@Controller("message")
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Get()
    getAllMessages() {
        return this.messageService.getAllMessages();
    }

    @Get('id/group_id?')
    async getAllMessagesByGroupId(@Query('group_id') group_id) {
        const ret = await this.messageService.getAllMessagesByGroupId(group_id);
      return ret;
    }

    @Post('createMessage')
    @UsePipes(ValidationPipe)
    async createMessage(@Body() createMessageDto: CreateMessageDto) {
        try {
            const chat = await this.messageService.createMessage(createMessageDto);
            const ret = { message: chat.content };
            return ret;
        } catch (error) {
            return error;
        }
    }
}