// Nestjs
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { User } from "src/entities";

// Gateways
import { EventSocketGateway } from "src/gateways/event/event.gateway";
import { GatewayService } from "src/gateways/utils/GatewayService";

// Modules
import { UserModule } from "../user/user.module";

////////////////////////////////////////////////////////////

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    UserModule,
    JwtModule
  ],
  controllers: [],
  providers: [JwtService, GatewayService, EventSocketGateway],
  exports: []
})
export class EventModule {}
