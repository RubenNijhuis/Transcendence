import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { CreateUser1661542055999 } from "src/database/migrations/1661542055999-CreateUser";
import { User } from "./user.entity";
import { Chat } from "../chat/chat.entity";

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
            entities: [User, Chat],
            migrations: [CreateUser1661542055999],
            synchronize: true,
            logging: true,
            autoLoadEntities: true,
            // migrationsRun: true
        };
    }
}
