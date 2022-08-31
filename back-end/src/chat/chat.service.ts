import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Chat } from "src/typeorm";
import { Repository } from "typeorm";
import { CreateChatDto } from "./dtos/create-chat.dto";

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private readonly chatRepository: Repository<Chat>
    ) {}

    getAllMessages() {
        return this.chatRepository.find();
    }

    async getAllMessagesByGroupId(group_id: number): Promise<Chat[]> {
      console.log(group_id);
        const allMessages = await this.chatRepository
            .createQueryBuilder('chat')
            .where("group_id = :group_id", { group_id })
            .getMany();
            console.log(allMessages);
        return allMessages;
    }
    
    createChat(CreateChatDto: CreateChatDto) {
        const newChat = this.chatRepository.create(CreateChatDto);
        return this.chatRepository.save(newChat);
    }
}

//  getPostById(id: number) {
//    const post = this.messages.find(post => post.id === id);
//    if (post) {
// 	 return post;
//    }
//    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
