import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CreateUser1661771716474 } from "src/database/migrations/1661771716474-CreateUser";
import { FriendList } from "src/users/friendlist/friendlist.entity";
import { User } from "src/users/user.entity";
import { Chat } from "src/chat/chat.entity";

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
            entities: [User, FriendList, Chat],
            migrations: [CreateUser1661771716474],
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
            migrationsRun: false
        };
    }
}
