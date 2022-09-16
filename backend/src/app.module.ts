import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { typeOrmAsyncConfig } from './typeorm/typeorm.config';
import { envConfig } from './configs/env.config';
import { FriendslistModule } from './entities/friendlist.module';
import { BlockListModule } from './modules/blocklist.module';
import { FriendRequestModule } from './modules/friendrequest.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  	UsersModule,
    FriendslistModule,
    BlockListModule,
    FriendRequestModule,
  	AuthModule,
    PassportModule.register({ session: true }),
	],
  controllers: [],
  providers: [],
})
export class AppModule {}