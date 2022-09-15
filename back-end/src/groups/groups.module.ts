import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm';
import { GroupService } from './groups.service';
import {GroupController} from './groups.controller'
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { Groupuser } from './groupusers/groupuser.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Group, Groupuser]), UsersModule],
	controllers: [GroupController],
	providers: [GroupService],
	exports: [GroupService]
})
export class GroupModule {}