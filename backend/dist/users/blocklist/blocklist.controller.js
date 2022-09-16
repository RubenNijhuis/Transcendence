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
exports.BlockListController = void 0;
const common_1 = require("@nestjs/common");
const blocklist_service_1 = require("./blocklist.service");
const create_blocklist_dto_1 = require("./dtos/create-blocklist.dto");
let BlockListController = class BlockListController {
    constructor(blocklistService) {
        this.blocklistService = blocklistService;
    }
    async getblocked(username) {
        return await this.blocklistService.getBlocked(username);
    }
    async getblock(createBlockDto) {
        return await this.blocklistService.getBlock(createBlockDto.username, createBlockDto.blocked);
    }
    async addblock(createBlockDto) {
        return await this.blocklistService.blockPerson(createBlockDto);
    }
    async unblock(createBlockDto) {
        return await this.blocklistService.unblockPerson(createBlockDto.username, createBlockDto.blocked);
    }
};
__decorate([
    (0, common_1.Get)('getblocked?'),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockListController.prototype, "getblocked", null);
__decorate([
    (0, common_1.Post)('getblock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blocklist_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockListController.prototype, "getblock", null);
__decorate([
    (0, common_1.Post)('addblock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blocklist_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockListController.prototype, "addblock", null);
__decorate([
    (0, common_1.Post)('unblock'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blocklist_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockListController.prototype, "unblock", null);
BlockListController = __decorate([
    (0, common_1.Controller)('block'),
    __metadata("design:paramtypes", [blocklist_service_1.BlocklistService])
], BlockListController);
exports.BlockListController = BlockListController;
//# sourceMappingURL=blocklist.controller.js.map