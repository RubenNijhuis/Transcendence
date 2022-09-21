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
exports.FriendlistController = void 0;
const common_1 = require("@nestjs/common");
const friendlist_1 = require("../../dtos/friendlist");
const friendlist_service_1 = require("../../services/friendlist/friendlist.service");
let FriendlistController = class FriendlistController {
    constructor(friendlistService) {
        this.friendlistService = friendlistService;
    }
    async getfriends(username) {
        return await this.friendlistService.getFriends(username);
    }
    async getfriend(createfriendsDto) {
        return await this.friendlistService.getFriend(createfriendsDto.username, createfriendsDto.friendname);
    }
    async isfriend(createfriendsDto) {
        return await this.friendlistService.isFriend(createfriendsDto.username, createfriendsDto.friendname);
    }
    async addfriend(createfriendsDto) {
        return await this.friendlistService.addFriend(createfriendsDto);
    }
    async removefriend(createfriendsDto) {
        return await this.friendlistService.removeFriend(createfriendsDto.username, createfriendsDto.friendname);
    }
};
__decorate([
    (0, common_1.Get)('getfriends?'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendlistController.prototype, "getfriends", null);
__decorate([
    (0, common_1.Post)('getfriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friendlist_1.CreateFriensdDto]),
    __metadata("design:returntype", Promise)
], FriendlistController.prototype, "getfriend", null);
__decorate([
    (0, common_1.Post)('isfriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friendlist_1.CreateFriensdDto]),
    __metadata("design:returntype", Promise)
], FriendlistController.prototype, "isfriend", null);
__decorate([
    (0, common_1.Post)('addfriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friendlist_1.CreateFriensdDto]),
    __metadata("design:returntype", Promise)
], FriendlistController.prototype, "addfriend", null);
__decorate([
    (0, common_1.Post)('removefriend'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friendlist_1.CreateFriensdDto]),
    __metadata("design:returntype", Promise)
], FriendlistController.prototype, "removefriend", null);
FriendlistController = __decorate([
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friendlist_service_1.FriendlistService])
], FriendlistController);
exports.FriendlistController = FriendlistController;
//# sourceMappingURL=friendlist.controller.js.map