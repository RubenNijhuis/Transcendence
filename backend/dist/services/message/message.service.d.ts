import { CreateMessageDto } from "src/dtos/chat";
import Message from "src/entities/message/message.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/groups.service";
export declare class MessageService {
    private readonly chatRepository;
    private readonly groupService;
    constructor(chatRepository: Repository<Message>, groupService: GroupService);
    getAllMessages(): Promise<Message[]>;
    getAllMessagesByGroupId(group_id: number): Promise<Message[]>;
    createChat(createMessageDto: CreateMessageDto): Promise<Message>;
}
