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
const auth_service_1 = require("../services/auth.service");
const axios_1 = require("axios");
const config_1 = require("@nestjs/config");
const users_service_1 = require("../../users/users.service");
const jwt_strategy_1 = require("../strategies/jwt.strategy");
const _2fa_dto_1 = require("../dto/2fa.dto");
const username_dto_1 = require("../dto/username.dto");
let AuthController = class AuthController {
    constructor(usersService, authService, configService) {
        this.usersService = usersService;
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
        const accessTokenResp = await axios_1.default.post(this.configService.get("INTRA_TOKEN_URL"), null, {
            params: {
                grant_type: "authorization_code",
                client_id: this.configService.get("FORTYTWO_APP_ID"),
                client_secret: this.configService.get("FORTYTWO_APP_SECRET"),
                code: token,
                redirect_uri: this.configService.get("FORTYTWO_CALLBACK_URL")
            }
        });
        console.log("token: ", accessTokenResp.data.access_token);
        const userData = await axios_1.default.get(this.configService.get("INTRA_GET_ME_URL"), {
            headers: {
                Authorization: `Bearer ${accessTokenResp.data.access_token}`
            }
        });
        const intraID = userData.data.id;
        console.log(intraID);
        return this.authService.validateUser(intraID);
    }
    status() { }
    logout() { }
    signup() {
        return this.authService.signup;
    }
    signin() {
        return this.authService.signin;
    }
    async jwtsession(userDto) {
        console.log("jwt test:");
        const ret = await this.authService.login(userDto);
        console.log(ret);
        return ret;
    }
    async google2fa(userDto) {
        try {
            const res = await this.authService.generateTwoFactorAuthenticationSecret(userDto);
            console.log(res);
        }
        catch (error) {
            return error;
        }
    }
    async authenticate(res, twofadto) {
        const isCodeValid = await this.authService.isTwoFactorAuthenticationCodeValid(twofadto);
        if (isCodeValid === false) {
            throw new common_1.UnauthorizedException("Wrong authentication code");
        }
        res.sendStatus(200);
    }
    async test() {
        console.log("UwU!!");
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
__decorate([
    (0, common_1.Get)("status"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "status", null);
__decorate([
    (0, common_1.Get)("logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)("singup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)("singin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.UseGuards)(jwt_strategy_1.Jwt2faStrategy),
    (0, common_1.Post)("jwtsession"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [username_dto_1.UsernameDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "jwtsession", null);
__decorate([
    (0, common_1.Post)("google2fa"),
    (0, common_1.UseGuards)(jwt_strategy_1.Jwt2faStrategy),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [username_dto_1.UsernameDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "google2fa", null);
__decorate([
    (0, common_1.Post)("google2fa/authenticate"),
    (0, common_1.UseGuards)(jwt_strategy_1.Jwt2faStrategy),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, _2fa_dto_1.twofadto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticate", null);
__decorate([
    (0, common_1.Post)("Test"),
    (0, common_1.UseGuards)(jwt_strategy_1.Jwt2faStrategy),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map