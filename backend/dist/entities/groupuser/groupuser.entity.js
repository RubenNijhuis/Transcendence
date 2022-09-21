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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupUser = void 0;
const typeorm_1 = require("typeorm");
const group_entity_1 = require("../group/group.entity");
const user_entity_1 = require("../user/user.entity");
let GroupUser = class GroupUser {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], GroupUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GroupUser.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => group_entity_1.default, (group) => group.users),
    __metadata("design:type", group_entity_1.default)
], GroupUser.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GroupUser.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.default, (user) => user.groups),
    __metadata("design:type", user_entity_1.default)
], GroupUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GroupUser.prototype, "userType", void 0);
GroupUser = __decorate([
    (0, typeorm_1.Entity)()
], GroupUser);
exports.GroupUser = GroupUser;
exports.default = GroupUser;
//# sourceMappingURL=groupuser.entity.js.map