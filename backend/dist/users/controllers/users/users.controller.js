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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const seeder_config_1 = require("../../../configs/seeder.config");
const user_create_seed_1 = require("../../../database/seeds/user-create.seed");
const create_users_dto_1 = require("../../dtos/create-users.dto");
const user_opp_dto_1 = require("../../dtos/user-opp.dto");
const users_service_1 = require("../../services/users/users.service");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    getUsers() {
        return this.userService.getUsers();
    }
    findUsersById(username) {
        return this.userService.findUserByUsername(username);
    }
    async createUsers(createUserDto) {
        try {
            const user = await this.userService.createUser(createUserDto);
            const ret = { "username": user.username };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async seedUsers() {
        const seed = new user_create_seed_1.UserSeeder({ seedingSource: seeder_config_1.seederConfig });
        await seed.run();
    }
    async addfriend(userOppDto) {
        try {
            await this.userService.addFriend(userOppDto);
        }
        catch (error) {
            return error;
        }
    }
    async addblocked(userOppDto) {
        try {
            await this.userService.addBlocked(userOppDto);
        }
        catch (error) {
            return error;
        }
    }
    async removefriend(userOppDto) {
        try {
            await this.userService.removeFriend(userOppDto);
        }
        catch (error) {
            return error;
        }
    }
    async removeblocked(userOppDto) {
        try {
            await this.userService.removeBlocked(userOppDto);
        }
        catch (error) {
            return error;
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('id/:username'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findUsersById", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_users_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)('seeder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "seedUsers", null);
__decorate([
    (0, common_1.Post)('addfriend'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_opp_dto_1.UserOppDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addfriend", null);
__decorate([
    (0, common_1.Post)('addblocked'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_opp_dto_1.UserOppDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addblocked", null);
__decorate([
    (0, common_1.Post)('removefriend'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_opp_dto_1.UserOppDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removefriend", null);
__decorate([
    (0, common_1.Post)('removeblocked'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_opp_dto_1.UserOppDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeblocked", null);
UsersController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map