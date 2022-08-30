import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './constants/constants';
import { PassportModule } from '@nestjs/passport';
import { Jwt2faStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, ConfigModule, HttpModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1D' },
  }),
],
  providers: [LocalStrategy, AuthService, Jwt2faStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
