import { CreateMessageDto } from 'src/dtos/chat';
import { MessageService } from 'src/services/message/message.service';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getAllMessages(): Promise<import("../../entities/message/message.entity").Message[]>;
    getAllMessagesByGroupId(group_id: any): Promise<import("../../entities/message/message.entity").Message[]>;
    createChat(createMessageDto: CreateMessageDto): Promise<any>;
}
