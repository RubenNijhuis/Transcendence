import { Injectable, Inject } from '@nestjs/common';
import { env } from 'node:process';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: String(env.DATABASE_HOST),
      port: Number(env.DATABASE_PORT),
      database: String(env.DATABASE_NAME),
      username: String(env.DATABASE_USER),
      password: String(env.DATABASE_PASSWORD),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
