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
exports.FriendRequestController = void 0;
const common_1 = require("@nestjs/common");
const create_request_dto_1 = require("./dtos/create-request.dto");
const friendrequest_service_1 = require("./friendrequest.service");
let FriendRequestController = class FriendRequestController {
    constructor(friendrequestService) {
        this.friendrequestService = friendrequestService;
    }
    async getrequests(username) {
        return await this.friendrequestService.getRequests(username);
    }
    async senrequest(requestDto) {
        return await this.friendrequestService.sendRequest(requestDto);
    }
    async removerequest(requestDto) {
        return await this.friendrequestService.removeRequest(requestDto.username, requestDto.requested);
    }
};
__decorate([
    (0, common_1.Get)('getrequests?'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "getrequests", null);
__decorate([
    (0, common_1.Post)('sendrequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "senrequest", null);
__decorate([
    (0, common_1.Post)('removerequest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_request_dto_1.CreateRequestDto]),
    __metadata("design:returntype", Promise)
], FriendRequestController.prototype, "removerequest", null);
FriendRequestController = __decorate([
    (0, common_1.Controller)('friendrequest'),
    __metadata("design:paramtypes", [friendrequest_service_1.FriendrequestService])
], FriendRequestController);
exports.FriendRequestController = FriendRequestController;
//# sourceMappingURL=friendrequest.controller.js.map