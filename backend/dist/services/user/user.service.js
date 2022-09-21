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
exports.UserService = void 0;
const falso_1 = require("@ngneat/falso");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../entities");
const typeorm_2 = require("typeorm");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    getUsers() {
        return this.userRepository.find();
    }
    findUsersById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    findUsersByintraId(intraId) {
        return this.userRepository.findOne({ where: { intraId } });
    }
    findUserByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
    async createUser(createUserDto) {
        if (!await this.findUserByUsername(createUserDto.username))
            return;
        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);
    }
    async addsessiontoken(userDto, token) {
        const ret = await this.findUserByUsername(userDto.username);
        return await this.userRepository
            .createQueryBuilder()
            .update(ret)
            .set({ jwtsession_token: token })
            .where({ id: ret.id })
            .returning("*")
            .execute();
    }
    removeUser(username) {
        const ret = this.userRepository
            .createQueryBuilder("Users")
            .delete()
            .from("users")
            .where("username =:username", { username })
            .execute();
        return ret;
    }
    setTwoFactorAuthSecret(id, tfaSecret) {
        return this.userRepository.update(id, { tfaSecret });
    }
    async update2fasecret(userDto, secret) {
        const ret = await this.findUserByUsername(userDto.username);
        return this.userRepository
            .createQueryBuilder()
            .update(ret)
            .set({ tfaSecret: secret })
            .where({ id: ret.id })
            .returning("*")
            .execute();
    }
    async seedCustom(amount) {
        try {
            for (let i = 1; i <= amount; i++) {
                await this.createUser({
                    username: (0, falso_1.randFullName)(),
                    color: (0, falso_1.randColor)().toString(),
                    description: (0, falso_1.randParagraph)()
                });
            }
            return (common_1.HttpStatus.OK);
        }
        catch (error) {
            return common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }
    generateTwoFactorAuthenticationSecret(user) {
        const secret = otplib_1.authenticator.generateSecret();
        console.log(secret);
        const otpauthUrl = otplib_1.authenticator.keyuri("mehj177@gmail.com", "AUTH_APP_NAME", secret);
        console.log(otpauthUrl);
        return (0, qrcode_1.toDataURL)(otpauthUrl);
    }
    async turnOn2fa(usernameDto) {
        const ret = await this.findUserByUsername(usernameDto.username);
        return this.userRepository
            .createQueryBuilder()
            .update(ret)
            .set({ isTfaEnabled: true })
            .where({ id: ret.id })
            .returning("*")
            .execute();
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map