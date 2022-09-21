"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockListModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const blocklist_controller_1 = require("./blocklist.controller");
const blocklist_entity_1 = require("./blocklist.entity");
const blocklist_service_1 = require("./blocklist.service");
let BlockListModule = class BlockListModule {
};
BlockListModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([blocklist_entity_1.default])],
        controllers: [blocklist_controller_1.BlockListController],
        providers: [blocklist_service_1.BlocklistService],
    })
], BlockListModule);
exports.BlockListModule = BlockListModule;
//# sourceMappingURL=blocklist.module.js.map