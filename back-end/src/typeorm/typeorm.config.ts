import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { DataSource } from "typeorm";
import { CreateUser1661450378131 } from "../database/migrations/1661450378131-CreateUser";
const { SeedingSource } = require('@concepta/typeorm-seeding')
import { UserSeeder } from "src/database/seeds/user-create.seed";

const configService = new ConfigService();

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: [User],
            migrations: [CreateUser1661450378131],
            synchronize: false,
            logging: true,
            autoLoadEntities: true,
            migrationsRun: true
        };
    }
}

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: [User],
    migrations: [CreateUser1661450378131],
    migrationsRun: true
});

export const seederConfig = new SeedingSource({
    dataSource: typeOrmConfig,
    seeders: [UserSeeder,],
})
