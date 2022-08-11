import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm';
import { env } from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: String(env.DB_HOST),
        port: Number(env.DB_PORT),
        username: String(env.DB_USER),
        password: String(env.DB_PASSWORD),
        database: String(env.DB_NAME),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  	UsersModule
	],
  controllers: [],
  providers: [],
})
export class AppModule {}