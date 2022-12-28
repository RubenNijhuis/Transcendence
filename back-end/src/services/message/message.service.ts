import { forwardRef, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Group from "src/entities/group/group.entity";
import Message from "src/entities/message/message.entity";
import { errorHandler } from "src/utils/errorhandler/errorHandler";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { RecordService } from "../record/record.service";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly recordService: RecordService
  ) {}

  getAllMessages() {
    return this.messageRepository.find();
  }

  async getAllMessagesByGroupId(id: string): Promise<Message[]> {
    const allMessages: Message[] = await this.messageRepository
      .createQueryBuilder("message")
      .where({ groupId: id })
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
      if (await this.recordService.isUserBanned(senderID, group_id))
        throw console.error("You are currently still muted");
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
//  getPostById(id: number) {
//    const post = this.messages.find(post => post.id === id);
//    if (post) {
// 	 return post;
//    }
//    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
