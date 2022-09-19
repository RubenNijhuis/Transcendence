import { Module } from "@nestjs/common";
import { UserModule } from "../../modules/index";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../../auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { typeOrmAsyncConfig, envConfig } from "../../configs/index";
import {
  FriendlistModule,
  BlockListModule,
  FriendRequestModule
} from "../../modules/index";

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    FriendlistModule,
    BlockListModule,
    FriendRequestModule,
    AuthModule,
    PassportModule.register({ session: true })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
