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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("../../../typeorm");
const typeorm_3 = require("typeorm");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
let UsersService = class UsersService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUsers() {
        return this.userRepository.find();
    }
    findUsersById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    findUsersByIntraId(uid) {
        return this.userRepository.findOne({ where: { uid } });
    }
    findUserByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    findUserByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    setTwoFactorAuthSecret(id, twoFactorAuthenticationSecret) {
        return this.userRepository.update(id, { twoFactorAuthenticationSecret, });
    }
    async setTwoFactorAuthenticationSecret(secret, userId) {
        this.setTwoFactorAuthSecret(userId, secret);
    }
    createUser(createUserDto) {
        if (!this.findUserByUsername(createUserDto.username))
            return;
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }
    async addFriend(userOppDto) {
        const user = await this.findUserByUsername(userOppDto.username);
        const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
        let friendlist = JSON.parse(user.friends);
        let blocklist = JSON.parse(user.blocked);
        let selectedFriendlist = JSON.parse(selectedUser.friends);
        let selectedBlocklist = JSON.parse(selectedUser.blocked);
        if (!user
            || !selectedUser
            || userOppDto.username === userOppDto.selectedUsername
            || blocklist.includes(userOppDto.selectedUsername, 0)
            || selectedBlocklist.includes(userOppDto.username, 0)
            || (friendlist.includes(userOppDto.selectedUsername, 0)
                && friendlist.length != 0)) {
            console.log("\nthrows error\n");
            throw TypeError;
        }
        friendlist.push(userOppDto.selectedUsername);
        await this.userRepository.createQueryBuilder()
            .update({ friends: JSON.stringify(friendlist) })
            .where({ id: user.id })
            .execute();
        if (!selectedFriendlist.includes(userOppDto.username, 0))
            this.addFriend({ username: userOppDto.selectedUsername, selectedUsername: userOppDto.username });
    }
    async addBlocked(userOppDto) {
        const user = await this.findUserByUsername(userOppDto.username);
        const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
        let blockList = JSON.parse(user.blocked);
        let friendlist = JSON.parse(user.friends);
        if (!user
            || !selectedUser
            || userOppDto.username === userOppDto.selectedUsername
            || (blockList.includes(userOppDto.selectedUsername, 0)
                && blockList.length != 0)) {
            console.log("\nthrows error\n");
            throw TypeError;
        }
        blockList.push(userOppDto.selectedUsername);
        await this.userRepository.createQueryBuilder()
            .update({ blocked: JSON.stringify(blockList) })
            .where({ id: user.id })
            .execute();
        if (friendlist.includes(userOppDto.selectedUsername)) {
            this.removeFriend(userOppDto);
            this.removeFriend({ username: userOppDto.selectedUsername, selectedUsername: userOppDto.username });
        }
    }
    async removeFriend(userOppDto) {
        const user = await this.findUserByUsername(userOppDto.username);
        const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
        let friendlist = JSON.parse(user.friends);
        let selectedFriendlist = JSON.parse(selectedUser.friends);
        if (!user
            || !selectedUser
            || userOppDto.username === userOppDto.selectedUsername
            || !friendlist.includes(userOppDto.selectedUsername, 0)
            || friendlist.length == 0) {
            console.log("\nthrows error\n");
            throw TypeError;
        }
        friendlist.splice(friendlist.indexOf(userOppDto.selectedUsername, 0));
        await this.userRepository.createQueryBuilder()
            .update({ friends: JSON.stringify(friendlist) })
            .where({ id: user.id })
            .execute();
        if (selectedFriendlist.includes(userOppDto.username, 0))
            this.removeFriend({ username: userOppDto.selectedUsername, selectedUsername: userOppDto.username });
    }
    async removeBlocked(userOppDto) {
        const user = await this.findUserByUsername(userOppDto.username);
        const selectedUser = await this.findUserByUsername(userOppDto.selectedUsername);
        let blockList = JSON.parse(user.blocked);
        if (!user
            || !selectedUser
            || userOppDto.username === userOppDto.selectedUsername
            || !blockList.includes(userOppDto.selectedUsername, 0)
            || blockList.length == 0) {
            console.log("\nthrows error\n");
            throw TypeError;
        }
        blockList.splice(blockList.indexOf(userOppDto.selectedUsername, 0));
        await this.userRepository.createQueryBuilder()
            .update({ blocked: JSON.stringify(blockList) })
            .where({ id: user.id })
            .execute();
    }
    async generateTwoFactorAuthenticationSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        console.log(secret);
        const otpauthUrl = otplib_1.authenticator.keyuri('mehj177@gmail.com', 'AUTH_APP_NAME', secret);
        console.log(otpauthUrl);
        return ((0, qrcode_1.toDataURL)(otpauthUrl));
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map