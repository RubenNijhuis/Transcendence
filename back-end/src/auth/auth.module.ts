import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [UsersModule, ConfigModule, HttpModule, JwtModule.register( //added this
  {
    secret: 'secret',
    signOptions: { expiresIn: '1d' },
  })
],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
