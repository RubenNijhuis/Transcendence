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
exports.LocalStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_42_1 = require("passport-42");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const auth_service_1 = require("../services/auth.service");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_42_1.Strategy, '42') {
    constructor(configService, httpService, AuthService) {
        super({
            authorizationURL: configService.get('INTRA_AUTH_URL'),
            tokenURL: configService.get('INTRA_TOKEN_URL'),
            clientID: configService.get('FORTYTWO_APP_ID'),
            clientSecret: configService.get('FORTYTWO_APP_SECRET'),
            callbackURL: configService.get('FORTYTWO_CALLBACK_URL'),
        });
        this.configService = configService;
        this.httpService = httpService;
        this.AuthService = AuthService;
    }
};
LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService,
        auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=index.js.map