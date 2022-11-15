import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TfaController } from "src/controllers/tfa/tfa.controller";
import { TfaService } from "src/services/tfa/tfa.service";
import { UserModule } from "../user/user.module";

@Module({
  imports: [UserModule, ConfigModule],
  providers: [TfaService ],
  controllers: [TfaController]
})
export class TfaModule {}
