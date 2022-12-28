import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { envConfig, typeOrmAsyncConfig } from "src/configs";
import { UserModule } from "src/modules/user/user.module";
import { FriendlistModule } from "src/modules/friendlist/friendlist.module";
import { FriendRequestModule } from "src/modules/friendrequest/friendrequest.module";
import { AuthModule } from "src/modules/authentication/auth.module";
import { MessageModule } from "src/modules/message/message.module";
import { GroupModule } from "src/modules/group/group.module";
import { TfaModule } from "src/modules/tfa/tfa.module";
import { RecordModule } from "src/modules/record/record.module";
import { MatchHistoryModule } from "src/modules/matchhistory/matchhistory.module";
import { SeederModule } from "src/modules/seeder/seeder.module";
import { ChatModule } from "src/modules/chat/chat.module";
import { BlockListModule } from "src/modules/blocklist/blocklist.module";
import { GameModule } from "src/modules/game/game.module";

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    FriendlistModule,
    FriendRequestModule,
    AuthModule,
    MessageModule,
    GroupModule,
    TfaModule,
    RecordModule,
    MatchHistoryModule,
    SeederModule,
    // GameModule,
    ChatModule,
    PassportModule.register({ session: true }),
    BlockListModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
