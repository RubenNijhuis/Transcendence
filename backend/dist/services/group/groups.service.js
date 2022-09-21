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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const group_entity_1 = require("../../entities/group/group.entity");
const typeorm_2 = require("typeorm");
const groupuser_entity_1 = require("../../entities/groupuser/groupuser.entity");
const user_service_1 = require("../user/user.service");
let GroupService = class GroupService {
    constructor(groupRepository, groupuserRepository, userService) {
        this.groupRepository = groupRepository;
        this.groupuserRepository = groupuserRepository;
        this.userService = userService;
    }
    getAllMessages() {
        return this.groupRepository.find();
    }
    findGroupById(id) {
        return this.groupRepository.findOne({ where: { id } });
    }
    async createPassword(createPasswordDto) {
        const group = this.findGroupById(createPasswordDto.id);
        if (!group)
            return console.error("group doesn't exist");
        const owner = (await group).owner;
        if (owner === createPasswordDto.owner)
            await this.groupRepository.update(createPasswordDto.id, createPasswordDto);
    }
    async updatePassword(editPasswordDto) {
        const group = await this.findGroupById(editPasswordDto.id);
        if (!group)
            return console.error("group doesn't exist");
        const owner = group.owner;
        const oldPassword = group.password;
        if (owner === editPasswordDto.owner &&
            oldPassword === editPasswordDto.oldPassword)
            return await this.groupRepository
                .createQueryBuilder()
                .update()
                .set({ password: editPasswordDto.newPassword })
                .where({
                id: editPasswordDto.id
            })
                .execute();
    }
    async createGroup(createGroupDto) {
        const newGroup = this.groupRepository.create();
        newGroup.owner = createGroupDto.owner;
        newGroup.users = [];
        return this.groupRepository.save(newGroup);
    }
    async addMembers(editGroupDto) {
        for (let i = 0; i < editGroupDto.users.length; i++) {
            const groupuser = this.groupuserRepository.create();
            groupuser.group = await this.findGroupById(editGroupDto.groupId);
            groupuser.user = await this.userService.findUsersById(editGroupDto.users[i]);
            groupuser.groupId = editGroupDto.groupId;
            groupuser.userId = editGroupDto.users[i];
            groupuser.userType = 0;
            this.groupuserRepository.save(groupuser);
        }
        return;
    }
    async removeMembers(editGroupDto) {
        for (let i = 0; i < editGroupDto.users.length; i++) {
            const userToRemove = await this.groupuserRepository
                .createQueryBuilder("groupuser")
                .where({ groupId: editGroupDto.groupId })
                .andWhere({ userId: editGroupDto.users[i] })
                .getOne();
            if (userToRemove) {
                this.groupuserRepository.delete(userToRemove);
            }
        }
        return;
    }
    async makeAdmin(createAdminDto) {
        const groupuser = await this.groupuserRepository
            .createQueryBuilder("groupuser")
            .where({ groupId: createAdminDto.group })
            .andWhere({ userId: createAdminDto.user })
            .getOne();
        const group = await this.findGroupById(createAdminDto.group);
        console.log(groupuser.userId);
        console.log(groupuser.groupId);
        if (groupuser && group.owner === createAdminDto.owner) {
            console.log("Bingo");
            groupuser.userType = 1;
        }
        console.log("2");
        return this.groupuserRepository.save(groupuser);
    }
    async unMakeAdmin(createAdminDto) {
        const groupuser = await this.groupuserRepository
            .createQueryBuilder("groupuser")
            .where({ groupId: createAdminDto.group })
            .andWhere({ userId: createAdminDto.user })
            .getOne();
        const group = await this.findGroupById(createAdminDto.group);
        if (groupuser && group.owner === createAdminDto.owner) {
            groupuser.userType = 0;
        }
        return this.groupuserRepository.save(groupuser);
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(group_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(groupuser_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=groups.service.js.map