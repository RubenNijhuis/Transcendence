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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint',
        name: 'user_id',
    }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'uid',
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "uid", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'username',
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'img_url',
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "img_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'email_address',
        nullable: false,
        default: '',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'rank',
        nullable: false,
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'wins',
        nullable: false,
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "wins", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'losses',
        nullable: false,
        default: 0
    }),
    __metadata("design:type", Number)
], User.prototype, "losses", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'friendlist',
        nullable: false,
        default: '[]',
    }),
    __metadata("design:type", String)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'blocklist',
        nullable: false,
        default: '[]',
    }),
    __metadata("design:type", String)
], User.prototype, "blocked", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'twoFactorAuthenticationSecret',
        nullable: false,
        default: '2FA_SECRET',
    }),
    __metadata("design:type", String)
], User.prototype, "twoFactorAuthenticationSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'isTwoFactorAuthenticationEnabled',
        nullable: false,
        default: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isTwoFactorAuthenticationEnabled", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
exports.default = User;
//# sourceMappingURL=user.entity.js.map