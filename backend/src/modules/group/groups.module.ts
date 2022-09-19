import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from '../../services/group/groups.service';
import {GroupController} from '../../controllers/group/groups.controller'
import Group from 'src/entities/group/group.entity';
import GroupUser from 'src/entities/groupuser/groupuser.entity';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Group, GroupUser]), UserModule],
	controllers: [GroupController],
	providers: [GroupService],
	exports: [GroupService]
})
export class GroupModule {}