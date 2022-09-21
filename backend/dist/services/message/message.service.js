"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("../../entities/message/message.entity");
const typeorm_2 = require("typeorm");
const groups_service_1 = require("../group/groups.service");
let MessageService = class MessageService {
    constructor(chatRepository, groupService) {
        this.chatRepository = chatRepository;
        this.groupService = groupService;
    }
    getAllMessages() {
        return this.chatRepository.find();
    }
    async getAllMessagesByGroupId(group_id) {
        const allMessages = await this.chatRepository
            .createQueryBuilder('chat')
            .where("group_id = :group_id", { group_id })
            .getMany();
        return allMessages;
    }
    async createChat(createMessageDto) {
        const group = await this.groupService.findGroupById(createMessageDto.group_id);
        const newChat = this.chatRepository.create(createMessageDto);
        newChat.group = group;
        return this.chatRepository.save(newChat);
    }
};
MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        groups_service_1.GroupService])
], MessageService);
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map