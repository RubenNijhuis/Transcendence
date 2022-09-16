"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
const friendlist_entity_1 = require("../users/friendlist/friendlist.entity");
const blocklist_entity_1 = require("../users/blocklist/blocklist.entity");
const friendrequest_entity_1 = require("../users/friendrequests/friendrequest.entity");
const _1661971166323_CreateTables_1 = require("../database/migrations/1661971166323-CreateTables");
const uninitialized_entity_1 = require("../users/uninitialized/uninitialized.entity");
const configService = new config_1.ConfigService();
exports.typeOrmConfig = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    entities: [user_entity_1.User, uninitialized_entity_1.default, friendlist_entity_1.FriendList, blocklist_entity_1.BlockList, friendrequest_entity_1.default],
    migrations: [_1661971166323_CreateTables_1.CreateTables1661971166323],
    migrationsRun: true
});
//# sourceMappingURL=typeorm.config-migrations.js.map