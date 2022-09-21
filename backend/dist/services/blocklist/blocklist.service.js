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
exports.BlocklistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blocklist_entity_1 = require("../../entities/blocklist/blocklist.entity");
let BlocklistService = class BlocklistService {
    constructor(blocklistRepository) {
        this.blocklistRepository = blocklistRepository;
    }
    async getBlocked(username) {
        const blocked = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .getMany();
        return blocked;
    }
    async getBlock(username, blockedname) {
        const blocked = await this.blocklistRepository
            .createQueryBuilder('block_list')
            .where('user = :username', { username })
            .andWhere('blockname = :blocked', { blockedname })
            .getOne();
        return blocked;
    }
    async isBlocked(username, friendname) {
        return (!(await this.getBlock(username, friendname) === null)
            || !(await this.getBlock(friendname, username) === null));
    }
    async blockPerson(createBlockDto) {
        const newEntry = this.blocklistRepository.create(createBlockDto);
        return this.blocklistRepository.save(newEntry);
    }
    async unblockPerson(username, toblock) {
        return this.blocklistRepository
            .createQueryBuilder('block_list')
            .delete()
            .from('block_list')
            .where('username = :username', { username })
            .andWhere('blockname = :toblock', { toblock })
            .execute();
    }
};
BlocklistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(blocklist_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BlocklistService);
exports.BlocklistService = BlocklistService;
//# sourceMappingURL=blocklist.service.js.map