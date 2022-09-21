"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const groups_service_1 = require("../../services/group/groups.service");
const groups_controller_1 = require("../../controllers/group/groups.controller");
const group_entity_1 = require("../../entities/group/group.entity");
const groupuser_entity_1 = require("../../entities/groupuser/groupuser.entity");
const user_module_1 = require("../user/user.module");
let GroupModule = class GroupModule {
};
GroupModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([group_entity_1.default, groupuser_entity_1.default]), user_module_1.UserModule],
        controllers: [groups_controller_1.GroupController],
        providers: [groups_service_1.GroupService],
        exports: [groups_service_1.GroupService]
    })
], GroupModule);
exports.GroupModule = GroupModule;
//# sourceMappingURL=groups.module.js.map