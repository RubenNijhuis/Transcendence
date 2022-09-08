import { ConfigService } from "@nestjs/config";
import { User } from "../users/user.entity";
import { FriendList } from "../users/friendlist/friendlist.entity";
import { BlockList } from "../users/blocklist/blocklist.entity";
import FriendRequests from "../users/friendrequests/friendrequest.entity";
import { DataSource } from "typeorm";
const configService = new ConfigService();

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: [User, FriendList, BlockList, FriendRequests],
    migrations: [],
    migrationsRun: true
});
