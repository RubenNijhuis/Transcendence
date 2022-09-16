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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const otplib_1 = require("otplib");
const users_service_1 = require("../../users/users.service");
const qrcode_1 = require("qrcode");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(intraId) {
        const res = {
            shouldCreateUser: false,
            profile: null,
            authToken: "sock yer dads"
        };
        const user = await this.usersService.findUsersByintraId(intraId);
        if (user) {
            res.profile = user;
        }
        else {
            res.shouldCreateUser = true;
        }
        console.log(JSON.stringify(user));
        return res;
    }
    async createUser(userDto) {
        return await this.usersService.createUser(userDto);
    }
    findUser() {
        throw new Error("Method not implemented.");
    }
    signup() {
        return { msg: "I have signed up" };
    }
    signin() {
        return { msg: "I have signed in" };
    }
    async addjwttoken(usernameDto, token) {
        const ret = await this.usersService.findUserByUsername(usernameDto.username);
        this.usersService.addsessiontoken(usernameDto, token);
    }
    async login(usernameDto) {
        const r = await this.usersService.findUserByUsername(usernameDto.username);
        const payload = {
            username: usernameDto.username
        };
        const ret = this.jwtService.sign(payload);
        this.addjwttoken(usernameDto, ret);
        return ret;
    }
    async isTwoFactorAuthenticationCodeValid(Twofadto) {
        const ret = await this.usersService.findUserByUsername(Twofadto.username);
        console.log(Twofadto.twoFactorAuthenticationCode);
        console.log(ret.twoFactorAuthenticationSecret);
        const res = otplib_1.authenticator.check(Twofadto.twoFactorAuthenticationCode, ret.twoFactorAuthenticationSecret);
        console.log(res);
        return res;
    }
    async generateTwoFactorAuthenticationSecret(usernameDto) {
        const ret = await this.usersService.findUserByUsername(usernameDto.username);
        if (!ret || ret.isTwoFactorAuthenticationEnabled === false) {
            throw TypeError;
        }
        var secret = "";
        if (ret.twoFactorAuthenticationSecret == "") {
            secret = otplib_1.authenticator.generateSecret();
            console.log("secret:");
            console.log(secret);
            this.usersService.update2fasecret(usernameDto, secret);
        }
        else {
            secret = ret.twoFactorAuthenticationSecret;
        }
        const otpauthUrl = otplib_1.authenticator.keyuri(usernameDto.username, "TRANSCEND_2FA", secret);
        console.log("otapathurl:");
        console.log(otpauthUrl);
        console.log("todataurl:");
        const res = (0, qrcode_1.toDataURL)(otpauthUrl);
        return (0, qrcode_1.toDataURL)(otpauthUrl);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map