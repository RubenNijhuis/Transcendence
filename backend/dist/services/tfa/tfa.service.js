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
exports.TfaService = void 0;
const common_1 = require("@nestjs/common");
const otplib_1 = require("otplib");
const qrcode_1 = require("qrcode");
const user_service_1 = require("../user/user.service");
let TfaService = class TfaService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async isTfaValid(tfaDto) {
        const ret = await this.usersService.findUserByUsername(tfaDto.username);
        console.log(tfaDto.tfaCode);
        console.log(ret.tfaSecret);
        const res = otplib_1.authenticator.check(tfaDto.tfaCode, ret.tfaSecret);
        console.log(res);
        return res;
    }
    async generateTfaSecret(usernameDto) {
        const ret = await this.usersService.findUserByUsername(usernameDto.username);
        if (!ret || ret.isTfaEnabled === false) {
            throw TypeError;
        }
        var secret = "";
        if (ret.tfaSecret == "") {
            secret = otplib_1.authenticator.generateSecret();
            console.log("secret:");
            console.log(secret);
            this.usersService.update2fasecret(usernameDto, secret);
        }
        else {
            secret = ret.tfaSecret;
        }
        const otpauthUrl = otplib_1.authenticator.keyuri(usernameDto.username, "TRANSCEND_2FA", secret);
        console.log("otapathurl:");
        console.log(otpauthUrl);
        console.log("todataurl:");
        const res = (0, qrcode_1.toDataURL)(otpauthUrl);
        return (0, qrcode_1.toDataURL)(otpauthUrl);
    }
};
TfaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], TfaService);
exports.TfaService = TfaService;
//# sourceMappingURL=tfa.service.js.map