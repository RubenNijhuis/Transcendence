import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule.forRoot(), PassportModule, JwtModule.register({
    secret: process.env.JWT_CONSTANTS_PRIV_SECRET,
    signOptions: { expiresIn: '365D' },
  }),],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
