"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const friendrequest_controller_1 = require("./friendrequest.controller");
const friendrequest_entity_1 = require("./friendrequest.entity");
const friendrequest_service_1 = require("./friendrequest.service");
let FriendRequestModule = class FriendRequestModule {
};
FriendRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([friendrequest_entity_1.default])],
        controllers: [friendrequest_controller_1.FriendRequestController],
        providers: [friendrequest_service_1.FriendrequestService],
    })
], FriendRequestModule);
exports.FriendRequestModule = FriendRequestModule;
//# sourceMappingURL=friendrequest.module.js.map