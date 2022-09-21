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
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    getBearerToken(token) {
        return axios_1.default.post(this.configService.get("INTRA_TOKEN_URL"), null, {
            params: {
                grant_type: "authorization_code",
                client_id: this.configService.get("FORTYTWO_APP_ID"),
                client_secret: this.configService.get("FORTYTWO_APP_SECRET"),
                code: token,
                redirect_uri: this.configService.get("FORTYTWO_CALLBACK_URL")
            }
        });
    }
    getUserData(bearerToken) {
        return axios_1.default.get(this.configService.get("INTRA_GET_ME_URL"), {
            headers: {
                Authorization: `Bearer ${bearerToken.data.access_token}`
            }
        });
    }
    async validateUser(intraID) {
        const res = {
            shouldCreateUser: false,
            profile: null,
            authToken: "sock yer dads"
        };
        const user = await this.userService.findUsersByintraId(intraID);
        if (user) {
            res.profile = user;
        }
        else {
            res.shouldCreateUser = true;
        }
        console.log(JSON.stringify(user));
        return res;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map