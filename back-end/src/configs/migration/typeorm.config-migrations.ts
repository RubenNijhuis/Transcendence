import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { User } from "../../entities/user/user.entity";
import { FriendList } from "../../entities/friendlist/friendlist.entity";
import { BlockList } from "../../entities/blocklist/blocklist.entity";
import FriendRequest from "../../entities/friendrequest/friendrequest.entity";
import { CreateTables1661971166323 } from "../../database/migrations/1661971166323-CreateTables";

const configService = new ConfigService();

export const typeOrmConfig = new DataSource({
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASS"),
  database: configService.get<string>("DB_NAME"),
  entities: [User, FriendList, BlockList, FriendRequest],
  migrations: [],
  migrationsRun: false
});
