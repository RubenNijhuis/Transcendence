import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Jwt2faStrategy } from 'src/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants/constants';
import { AuthService } from 'src/auth/services/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1D' },
  }),],
  controllers: [UsersController],
  providers: [UsersService, AuthService, Jwt2faStrategy],
  exports: [UsersService],
})
export class UsersModule {}
