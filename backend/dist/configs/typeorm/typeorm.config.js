"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
const _1661971166323_CreateTables_1 = require("../../database/migrations/1661971166323-CreateTables");
const blocklist_entity_1 = require("../../entities/blocklist/blocklist.entity");
const friendlist_entity_1 = require("../../entities/friendlist/friendlist.entity");
const friendrequest_entity_1 = require("../../entities/friendrequest/friendrequest.entity");
const user_entity_1 = require("../../entities/user/user.entity");
exports.typeOrmAsyncConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => {
        return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
            entities: [user_entity_1.User, friendlist_entity_1.FriendList, blocklist_entity_1.BlockList, friendrequest_entity_1.default],
            migrations: [_1661971166323_CreateTables_1.CreateTables1661971166323],
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
            migrationsRun: true
        };
    }
};
//# sourceMappingURL=typeorm.config.js.map