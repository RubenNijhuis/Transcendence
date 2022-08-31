import { ConfigService } from "@nestjs/config";
import { CreateUser1661542055999 } from "../database/migrations/1661542055999-CreateUser";
import { DataSource } from "typeorm";
import { User } from "../typeorm/user.entity";

const configService = new ConfigService();

export const typeOrmConfig = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    database: configService.get<string>('DB_NAME'),
    entities: [User],
    migrations: [CreateUser1661542055999],
    migrationsRun: true
});