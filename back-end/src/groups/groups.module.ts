import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/typeorm';
import { GroupService } from './groups.service';
import {GroupController} from './groups.controller'

@Module({
	imports: [TypeOrmModule.forFeature([Group])],
	controllers: [GroupController],
	providers: [GroupService],
	exports: [GroupService]
})
export class GroupModule {}