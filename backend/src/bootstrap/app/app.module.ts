import { Module } from '@nestjs/common';
import { UserModule } from '../../modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { typeOrmAsyncConfig } from '../../configs/typeorm/typeorm.config';
import { envConfig } from '../../configs/env/env.config';
import { FriendslistModule } from '../../entities/friendlist/friendlist.module';
import { BlockListModule } from '../../modules/blocklist/blocklist.module';
import { FriendRequestModule } from '../../modules/friendrequest/friendrequest.module';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  	UserModule,
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