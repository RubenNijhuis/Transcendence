import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UsersModule, ConfigModule, HttpModule],
  providers: [LocalStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
