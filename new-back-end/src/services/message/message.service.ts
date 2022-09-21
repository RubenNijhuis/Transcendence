import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMessageDto } from "src/dtos/group";
import Message from "src/entities/message/message.entity";
import { Repository } from "typeorm";
import { GroupService } from "../group/group.service";

@Injectable()
export class MessageService {
//     import: [GroupService]
// inject: [GroupService]
    constructor(
        @InjectRepository(Message)
        private readonly chatRepository: Repository<Message>,
        private readonly groupService: GroupService
    ) {}

    getAllMessages() {
        return this.chatRepository.find();
    }

    async getAllMessagesByGroupId(group_id: number): Promise<Message[]> {
        const allMessages = await this.chatRepository
            .createQueryBuilder('chat')
            .where("group_id = :group_id", { group_id })
            .getMany();
        return allMessages;
    }
    
    async createMessage(createMessageDto: CreateMessageDto) {
        const group = await this.groupService.findGroupById(createMessageDto.group_id);
        // if (!group)
        //     return console.error();
        const newChat = this.chatRepository.create(createMessageDto);

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
