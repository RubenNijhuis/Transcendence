import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateChatDto } from "../../dtos/chat/create-message.dto";
import { GroupService } from "../group/groups.service";

@Injectable()
export class MessageService {
//     import: [GroupService]
// inject: [GroupService]
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>,
        private readonly groupService: GroupService
    ) {}

    getAllMessages() {
        return this.chatRepository.find();
    }

    async getAllMessagesByGroupId(group_id: number): Promise<Chat[]> {
        const allMessages = await this.chatRepository
            .createQueryBuilder('chat')
            .where("group_id = :group_id", { group_id })
            .getMany();
        return allMessages;
    }
    
    async createChat(CreateChatDto: CreateChatDto) {
        const group = await this.groupService.findGroupById(CreateChatDto.group_id);
        // if (!group)
        //     return console.error();
        const newChat = this.chatRepository.create(CreateChatDto);

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
