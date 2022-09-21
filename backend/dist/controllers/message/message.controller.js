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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const chat_1 = require("../../dtos/chat");
const message_service_1 = require("../../services/message/message.service");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    getAllMessages() {
        return this.messageService.getAllMessages();
    }
    async getAllMessagesByGroupId(group_id) {
        const ret = await this.messageService.getAllMessagesByGroupId(group_id);
        return ret;
    }
    async createChat(createMessageDto) {
        try {
            const chat = await this.messageService.createChat(createMessageDto);
            const ret = { message: chat.content };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "getAllMessages", null);
__decorate([
    (0, common_1.Get)('id/group_id?'),
    __param(0, (0, common_1.Query)('group_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getAllMessagesByGroupId", null);
__decorate([
    (0, common_1.Post)('createMessage'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "createChat", null);
MessageController = __decorate([
    (0, common_1.Controller)("message"),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map