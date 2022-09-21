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
exports.UninitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uninitialized_entity_1 = require("./uninitialized.entity");
let UninitService = class UninitService {
    constructor(uninitRepo) {
        this.uninitRepo = uninitRepo;
    }
    findUninit(intraId) {
        return this.uninitRepo.findOne({ where: { intraId } });
    }
    createUninit(createUninitDto) {
        if (!this.findUninit(createUninitDto.intraId))
            return;
        const newUser = this.uninitRepo.create(createUninitDto);
        return this.uninitRepo.save(newUser);
    }
    removeUninit(intraId) {
        const ret = this.uninitRepo
            .createQueryBuilder('uninitialized')
            .delete()
            .from('Uninitialized')
            .where('intraId =:intraId', { intraId })
            .execute();
        return ret;
    }
};
UninitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(uninitialized_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UninitService);
exports.UninitService = UninitService;
//# sourceMappingURL=uninitialized.service.js.map