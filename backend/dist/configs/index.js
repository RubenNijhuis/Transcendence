"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmAsyncConfig = exports.seederConfig = exports.typeOrmConfig = exports.envConfig = exports.sessionConfig = exports.pipenConfig = exports.corsConfig = void 0;
const cors_config_1 = require("./app/cors.config");
Object.defineProperty(exports, "corsConfig", { enumerable: true, get: function () { return cors_config_1.corsConfig; } });
const pipe_config_1 = require("./app/pipe.config");
Object.defineProperty(exports, "pipenConfig", { enumerable: true, get: function () { return pipe_config_1.pipenConfig; } });
const session_config_1 = require("./app/session.config");
Object.defineProperty(exports, "sessionConfig", { enumerable: true, get: function () { return session_config_1.sessionConfig; } });
const env_config_1 = require("./env/env.config");
Object.defineProperty(exports, "envConfig", { enumerable: true, get: function () { return env_config_1.envConfig; } });
const typeorm_config_migrations_1 = require("./migration/typeorm.config-migrations");
Object.defineProperty(exports, "typeOrmConfig", { enumerable: true, get: function () { return typeorm_config_migrations_1.typeOrmConfig; } });
const seeder_config_1 = require("./seeder/seeder.config");
Object.defineProperty(exports, "seederConfig", { enumerable: true, get: function () { return seeder_config_1.seederConfig; } });
const typeorm_config_1 = require("./typeorm/typeorm.config");
Object.defineProperty(exports, "typeOrmAsyncConfig", { enumerable: true, get: function () { return typeorm_config_1.typeOrmAsyncConfig; } });
const configs = [
    cors_config_1.corsConfig,
    pipe_config_1.pipenConfig,
    session_config_1.sessionConfig,
    env_config_1.envConfig,
    typeorm_config_migrations_1.typeOrmConfig,
    seeder_config_1.seederConfig,
    typeorm_config_1.typeOrmAsyncConfig,
];
exports.default = configs;
//# sourceMappingURL=index.js.map