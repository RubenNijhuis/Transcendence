import { Module } from "@nestjs/common";
import { UserService } from "../../services/user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsersController } from "../../controllers/user/user.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_CONSTANTS_PRIV_SECRET,
      signOptions: { expiresIn: "365D" }
    })
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
