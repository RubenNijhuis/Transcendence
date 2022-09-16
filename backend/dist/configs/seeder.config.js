"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seederConfig = void 0;
const user_create_seed_1 = require("../database/seeds/user-create.seed");
const typeorm_config_migrations_1 = require("./typeorm.config-migrations");
const { SeedingSource } = require('@concepta/typeorm-seeding');
exports.seederConfig = new SeedingSource({
    dataSource: typeorm_config_migrations_1.typeOrmConfig,
    seeders: [user_create_seed_1.UserSeeder,],
});
//# sourceMappingURL=seeder.config.js.map