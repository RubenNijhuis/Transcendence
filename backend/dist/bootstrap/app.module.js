"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const configs_1 = require("../configs");
const user_module_1 = require("../modules/user/user.module");
const friendlist_module_1 = require("../modules/friendlist/friendlist.module");
const friendrequest_module_1 = require("../modules/friendrequest/friendrequest.module");
const auth_module_1 = require("../modules/authentication/auth.module");
const message_module_1 = require("../modules/message/message.module");
const groups_module_1 = require("../modules/group/groups.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(configs_1.envConfig),
            typeorm_1.TypeOrmModule.forRootAsync(configs_1.typeOrmAsyncConfig),
            user_module_1.UserModule,
            friendlist_module_1.FriendlistModule,
            friendrequest_module_1.FriendRequestModule,
            auth_module_1.AuthModule,
            message_module_1.MessageModule,
            groups_module_1.GroupModule,
            passport_1.PassportModule.register({ session: true }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map