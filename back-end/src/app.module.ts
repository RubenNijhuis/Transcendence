import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm';
import { configSchema } from './config.schema';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
		envFilePath: ['.env'],
		validationSchema: configSchema,
	}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: entities,
        synchronize: true,
        isGlobal: true
      }),
      inject: [ConfigService],
    }),
  	UsersModule,
  	AuthModule,
    PassportModule.register({ session: true }),
	],
  controllers: [],
  providers: [],
})
export class AppModule {}