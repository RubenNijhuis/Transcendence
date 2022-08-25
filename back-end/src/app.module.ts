import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { typeOrmAsyncConfig } from './configs/typeorm.config';
import { envConfig } from './configs/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  	UsersModule,
  	AuthModule,
    PassportModule.register({ session: true }),
	],
  controllers: [],
  providers: [],
})
export class AppModule {}