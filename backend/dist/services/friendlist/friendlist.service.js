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
exports.FriendlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../../entities");
let FriendlistService = class FriendlistService {
    constructor(friendlistRepository) {
        this.friendlistRepository = friendlistRepository;
    }
    async getFriends(username) {
        const friends = await this.friendlistRepository
            .createQueryBuilder('friend_list')
            .where('users = :username', { username })
            .getMany();
        return friends;
    }
    async getFriend(username, friendname) {
        const friend = await this.friendlistRepository
            .createQueryBuilder('friend_list')
            .where('users = :username', { username })
            .andWhere('friends = :friendname', { friendname })
            .getOne();
        return friend;
    }
    async isFriend(username, friendname) {
        return (!(await this.getFriend(username, friendname) === null)
            || !(await this.getFriend(friendname, username) === null));
    }
    async addFriend(createfriendsDto) {
        const newEntry = this.friendlistRepository.create(createfriendsDto);
        return this.friendlistRepository.save(newEntry);
    }
    async removeFriend(username, friendname) {
        return this.friendlistRepository
            .createQueryBuilder('friend_list')
            .delete()
            .from('friend_list')
            .where('users = :username', { username })
            .andWhere('friends = :friendname', { friendname })
            .execute();
    }
};
FriendlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.FriendList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendlistService);
exports.FriendlistService = FriendlistService;
//# sourceMappingURL=friendlist.service.js.map