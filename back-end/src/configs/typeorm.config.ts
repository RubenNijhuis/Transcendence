import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import entities from "../typeorm";

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
            entities: entities,
            migrations: [__dirname + '../migrations', ],
            extra: { charset: 'utf8mb4_unicode_ci', },
            synchronize: true,
            logging: true,
        };
    }
}

export const typeormConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: entities,
        migrations: [__dirname + '../database/migrations/*.ts', ],
        extra: { charset: 'utf8mb4_unicode_ci', },
        logging: true,
    })
};

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//     imports: [ConfigModule],
//     inject: [ConfigService],
//     useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('DB_HOST'),
//         port: configService.get<number>('DB_PORT'),
//         username: configService.get<string>('DB_USER'),
//         password: configService.get<string>('DB_PASS'),
//         database: configService.get<string>('DB_NAME'),
//         entities: entities,
//         synchronize: true,
//         isGlobal: true
//     })
// }
