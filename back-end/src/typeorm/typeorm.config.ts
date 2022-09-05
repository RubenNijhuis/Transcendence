import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CreateTables1661971166323 } from "src/database/migrations/1661971166323-CreateTables";
import { BlockList } from "src/users/blocklist/blocklist.entity";
import { FriendList } from "src/users/friendlist/friendlist.entity";
import FriendRequests from "src/users/friendrequests/friendrequest.entity";
import { User } from "src/users/user.entity";
import { Chat } from "src/groups/chat/chat.entity";
import { Group } from "src/groups/groups.entity";

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: [User, FriendList, FriendRequests, Chat, Group],
            // migrations: [CreateTables1661971166323],
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
            // migrationsRun: true
        };
    }
}
