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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const auth_service_1 = require("../../services/authentication/auth.service");
let AuthController = class AuthController {
    constructor(authService, configService) {
        this.authService = authService;
        this.configService = configService;
    }
    login() {
        const url = this.configService.get("INTRA_AUTH_URL");
        const params = {
            client_id: this.configService.get("FORTYTWO_APP_ID"),
            redirect_uri: this.configService.get("FORTYTWO_CALLBACK_URL"),
            state: this.configService.get("FORTYTWO_STATE"),
            response_type: "code"
        };
        const redirectUrl = axios_1.default.getUri({ url, params });
        console.log(redirectUrl);
        return redirectUrl;
    }
    async confirm(token) {
        console.log("first token:", token);
        const res = await this.authService.getBearerToken(token);
        console.log("token: ", res.data.access_token);
        const userData = await this.authService.getUserData(res.data.access_token);
        const intraID = userData.data.id;
        console.log(intraID);
        return this.authService.validateUser(intraID);
    }
};
__decorate([
    (0, common_1.Get)("login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("confirm?"),
    __param(0, (0, common_1.Query)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
AuthController = __decorate([
    (0, common_1.Controller)("Auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map