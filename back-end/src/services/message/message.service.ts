// Nestjs
import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";

// Typeorm
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Entities
import Group from "src/entities/group/group.entity";
import Message from "src/entities/message/message.entity";

// Error Handler
import { errorHandler } from "src/utils/errorhandler/errorHandler";

// Services
import { GroupService } from "../group/group.service";
import { RecordService } from "../record/record.service";

////////////////////////////////////////////////////////////

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly recordService: RecordService
  ) {}

  //////////////////////////////////////////////////////////

  async getAllMessagesByGroupId(groupId: string): Promise<Message[]> {
    const allMessages: Message[] = await this.messageRepository
      .createQueryBuilder("message")
      .where({ groupId })
      .getMany();
    return allMessages;
  }

  async createMessage(
    senderID: string,
    group_id: string,
    content: string,
    content_type: number
  ) {
    try {
      const group: Group = await this.groupService.findGroupById(group_id);
      const query = {
        group: group,
        groupId: group.uid,
        senderID: senderID,
        content: content,
        content_type: content_type,
        sender: null
      };
      const newChat = this.messageRepository.create(query);
      return this.messageRepository.save(newChat);
    } catch (err) {
      throw errorHandler(err, "something", HttpStatus.FORBIDDEN);
    }
  }
}
