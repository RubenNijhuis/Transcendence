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
import { RecordModule } from "src/modules/record/record.module"

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
    PassportModule.register({ session: true })
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
