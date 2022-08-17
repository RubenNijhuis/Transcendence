import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule],
  providers: [LocalStrategy]
})
export class AuthModule {}
