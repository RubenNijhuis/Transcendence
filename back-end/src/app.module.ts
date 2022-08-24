import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeorm';
import { configSchema } from './config.schema';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { typeOrmAsyncConfig } from './typeorm/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], validationSchema: configSchema,}),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  	UsersModule,
  	AuthModule,
    PassportModule.register({ session: true }),
	],
  controllers: [],
  providers: [],
})
export class AppModule {}