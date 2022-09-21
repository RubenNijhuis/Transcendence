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
exports.Jwt2faStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../services/user/user.service");
const config_1 = require("@nestjs/config");
let Jwt2faStrategy = class Jwt2faStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-2fa') {
    constructor(userService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_CONSTANTS_SECRET'),
        });
        this.userService = userService;
        this.configService = configService;
    }
    async validate(payload) {
        const user = await this.userService.findUserByUsername(payload.username);
        if (user) {
            return user;
        }
    }
};
Jwt2faStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], Jwt2faStrategy);
exports.Jwt2faStrategy = Jwt2faStrategy;
//# sourceMappingURL=jst.strategy.js.map