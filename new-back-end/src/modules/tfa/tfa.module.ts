import { Module } from "@nestjs/common";
import { TfaController } from "src/controllers/tfa/tfa.controller";
import { TfaService } from "src/services/tfa/tfa.service";

@Module({
    imports: [
    ],
    providers: [
        TfaService
    ],
    controllers: [
        TfaController
    ],
})
export class TfaModule {}