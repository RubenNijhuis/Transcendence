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
exports.FriendrequestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const friendrequest_entity_1 = require("./friendrequest.entity");
let FriendrequestService = class FriendrequestService {
    constructor(friendlistRepository) {
        this.friendlistRepository = friendlistRepository;
    }
    async getRequests(username) {
        const friends = await this.friendlistRepository
            .createQueryBuilder('friend_requests')
            .where('requested = :username', { username })
            .getMany();
        return friends;
    }
    async sendRequest(createrequestDto) {
        const newEntry = this.friendlistRepository.create(createrequestDto);
        return this.friendlistRepository.save(newEntry);
    }
    async removeRequest(username, requested) {
        return this.friendlistRepository
            .createQueryBuilder('friend_requests')
            .delete()
            .from('friend_list')
            .where('users = :username', { username })
            .andWhere('requested = :requested', { requested })
            .execute();
    }
};
FriendrequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friendrequest_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendrequestService);
exports.FriendrequestService = FriendrequestService;
//# sourceMappingURL=friendrequest.service.js.map