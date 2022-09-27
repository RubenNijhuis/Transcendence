import { UserSeeder } from "src/database/seeds/user-create.seed";
import { typeOrmConfig } from "../migration/typeorm.config-migrations";
const { SeedingSource } = require("@concepta/typeorm-seeding");

export const seederConfig = new SeedingSource({
  dataSource: typeOrmConfig,
  seeders: [UserSeeder]
});
