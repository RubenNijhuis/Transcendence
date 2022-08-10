import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './typeorm/typeorm.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
