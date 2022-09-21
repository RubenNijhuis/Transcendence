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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const chat_1 = require("../../dtos/chat");
const groups_service_1 = require("../../services/group/groups.service");
const create_group_dto_1 = require("../../dtos/chat/create-group.dto");
const create_password_dto_1 = require("../../dtos/chat/create-password.dto");
const edit_password_dto_1 = require("../../dtos/chat/edit-password.dto");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    getAllMessages() {
        return this.groupService.getAllMessages();
    }
    async createPassword(CreatePasswordDto) {
        try {
            await this.groupService.createPassword(CreatePasswordDto);
            const ret = { message: "Password set! :D" };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async updatePassword(editPasswordDto) {
        try {
            await this.groupService.updatePassword(editPasswordDto);
            const ret = { message: "Password updated! :D" };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async createGroup(createGroupDto) {
        try {
            const group = await this.groupService.createGroup(createGroupDto);
            const groupId = group.id;
            const users = createGroupDto.users;
            const EditMembersDto = { groupId, users };
            await this.groupService.addMembers(EditMembersDto);
            const ret = { message: "Group created with id: " + group.id };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async addMembers(editGroupDto) {
        try {
            await this.groupService.addMembers(editGroupDto);
            const ret = { message: "members added " };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async removeMembers(editGroupDto) {
        try {
            await this.groupService.removeMembers(editGroupDto);
            const ret = { message: "members removed " };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async makeAdmin(createAdminDto) {
        try {
            const admin = await this.groupService.makeAdmin(createAdminDto);
            const ret = { message: "user " + admin.userId + " is now admin" };
            return ret;
        }
        catch (error) {
            return error;
        }
    }
    async unMakeAdmin(createAdminDto) {
        try {
            const admin = await this.groupService.unMakeAdmin(createAdminDto);
            const ret = { message: "user " + admin.userId + " is no longer admin" };
            return ret;
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
], GroupController.prototype, "getAllMessages", null);
__decorate([
    (0, common_1.Post)("createPassword"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_password_dto_1.CreatePasswordDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createPassword", null);
__decorate([
    (0, common_1.Post)("updatePassword"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_password_dto_1.EditPasswordDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Post)("createGroup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Post)("addMembers"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_1.EditGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "addMembers", null);
__decorate([
    (0, common_1.Post)("removeMembers"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_1.EditGroupDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "removeMembers", null);
__decorate([
    (0, common_1.Post)("makeAdmin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "makeAdmin", null);
__decorate([
    (0, common_1.Post)("unMakeAdmin"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], GroupController.prototype, "unMakeAdmin", null);
GroupController = __decorate([
    (0, common_1.Controller)("group"),
    __metadata("design:paramtypes", [groups_service_1.GroupService])
], GroupController);
exports.GroupController = GroupController;
//# sourceMappingURL=groups.controller.js.map