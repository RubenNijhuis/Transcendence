// Nestjs
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { User } from "src/entities";

// Gateways
import { GameSocketGateway } from "src/gateways/game/game.gateway";
import { GameService } from "src/gateways/game/game.service";

// Services

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
  providers: [GameSocketGateway, GameService],
  exports: []
})
export class GameModule {}
