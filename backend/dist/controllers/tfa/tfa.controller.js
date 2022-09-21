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
exports.TfaController = void 0;
const common_1 = require("@nestjs/common");
const auth_1 = require("../../dtos/auth");
const tfa_service_1 = require("../../services/tfa/tfa.service");
const jst_strategy_1 = require("../../middleware/jwt/jst.strategy");
let TfaController = class TfaController {
    constructor(tfaService) {
        this.tfaService = tfaService;
    }
    async google2fa(userDto) {
        try {
            const res = await this.tfaService.generateTfaSecret(userDto);
            console.log(res);
        }
        catch (error) {
            return error;
        }
    }
    async authenticate(res, tfaDto) {
        const isCodeValid = await this.tfaService.isTfaValid(tfaDto);
        if (isCodeValid === false) {
            throw new common_1.UnauthorizedException("Wrong authentication code");
        }
        res.sendStatus(200);
    }
};
__decorate([
    (0, common_1.Post)("google2fa"),
    (0, common_1.UseGuards)(jst_strategy_1.Jwt2faStrategy),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.UsernameDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "google2fa", null);
__decorate([
    (0, common_1.Post)("google2fa/authenticate"),
    (0, common_1.UseGuards)(jst_strategy_1.Jwt2faStrategy),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_1.TfaDto]),
    __metadata("design:returntype", Promise)
], TfaController.prototype, "authenticate", null);
TfaController = __decorate([
    (0, common_1.Controller)("tfa"),
    __metadata("design:paramtypes", [tfa_service_1.TfaService])
], TfaController);
exports.TfaController = TfaController;
//# sourceMappingURL=tfa.controller.js.map