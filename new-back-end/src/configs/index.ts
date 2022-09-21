import { corsConfig } from "./app/cors.config";
import { pipenConfig } from "./app/pipe.config";
import { sessionConfig } from "./app/session.config";
import { envConfig } from "./env/env.config";
import { typeOrmConfig } from "./migration/typeorm.config-migrations";
import { seederConfig } from "./seeder/seeder.config";
import { typeOrmAsyncConfig } from "./typeorm/typeorm.config";

const configs = [
  corsConfig,
  pipenConfig,
  sessionConfig,
  envConfig,
  typeOrmConfig,
  seederConfig,
  typeOrmAsyncConfig
];

export {
  corsConfig,
  pipenConfig,
  sessionConfig,
  envConfig,
  typeOrmConfig,
  seederConfig,
  typeOrmAsyncConfig
};

export default configs;
