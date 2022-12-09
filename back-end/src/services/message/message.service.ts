import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMessageDto } from "src/dtos/group/create-message.dto";
import Group from "src/entities/group/group.entity";
import Message from "src/entities/message/message.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";
import { RecordService } from "../record/record.service";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly chatRepository: Repository<Message>,
    @Inject(forwardRef(() => GroupService))
    private readonly groupService: GroupService,
    private readonly recordService: RecordService
  ) {}

  getAllMessages() {
    return this.chatRepository.find();
  }

  async getAllMessagesByGroupId(group_id: number): Promise<Message[]> {
    const allMessages : Message[] = await this.chatRepository
      .createQueryBuilder("chat")
      .where("group_id = :group_id", { group_id })
      .getMany();
    return allMessages;
  }

  async createMessage(createMessageDto: CreateMessageDto) {
    const group : Group = await this.groupService.findGroupById(
      createMessageDto.group_id
    );
    if (this.recordService.isUserBanned(createMessageDto.senderID, createMessageDto.group_id))
      throw console.error("This user is Banned/Muted");
    const newChat = this.chatRepository.create(createMessageDto);
    newChat.sender = null;
    newChat.group = group;
    return this.chatRepository.save(newChat);
  }
}

//  getPostById(id: number) {
//    const post = this.messages.find(post => post.id === id);
//    if (post) {
// 	 return post;
//    }
//    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
