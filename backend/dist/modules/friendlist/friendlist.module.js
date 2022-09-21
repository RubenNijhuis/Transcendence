"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendlistModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../entities");
const friendlist_controller_1 = require("../../controllers/friendlist/friendlist.controller");
const friendlist_service_1 = require("../../services/friendlist/friendlist.service");
let FriendlistModule = class FriendlistModule {
};
FriendlistModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.FriendList])],
        controllers: [friendlist_controller_1.FriendlistController],
        providers: [friendlist_service_1.FriendlistService],
        exports: [friendlist_service_1.FriendlistService]
    })
], FriendlistModule);
exports.FriendlistModule = FriendlistModule;
//# sourceMappingURL=friendlist.module.js.map