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
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const groupuser_entity_1 = require("../groupuser/groupuser.entity");
const message_entity_1 = require("../message/message.entity");
let Group = class Group {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: "bigint"
    }),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Group.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], Group.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => groupuser_entity_1.default, (groupuser) => groupuser.group),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => message_entity_1.default, (message) => message.group, {
        nullable: true
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Group.prototype, "messages", void 0);
Group = __decorate([
    (0, typeorm_1.Entity)()
], Group);
exports.Group = Group;
exports.default = Group;
//# sourceMappingURL=group.entity.js.map