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
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const passport_1 = require("@nestjs/passport");
const typeorm_config_1 = require("./typeorm/typeorm.config");
const env_config_1 = require("./configs/env.config");
const friendlist_module_1 = require("./users/friendlist/friendlist.module");
const blocklist_module_1 = require("./users/blocklist/blocklist.module");
const friendrequest_module_1 = require("./users/friendrequests/friendrequest.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(env_config_1.envConfig),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmAsyncConfig),
            users_module_1.UsersModule,
            friendlist_module_1.FriendslistModule,
            blocklist_module_1.BlockListModule,
            friendrequest_module_1.FriendRequestModule,
            auth_module_1.AuthModule,
            passport_1.PassportModule.register({ session: true }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map