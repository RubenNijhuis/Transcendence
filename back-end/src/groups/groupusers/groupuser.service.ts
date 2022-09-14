import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { GroupService } from "../groups.service";
import { CreateGroupuserDto } from "./create-groupuser.dto";
import Groupuser from "./groupuser.entity";

@Injectable()
export class GroupuserService {
    constructor(
        @InjectRepository (Groupuser)
        private readonly groupuserRepository: Repository<Groupuser>,
    ) {}

	async createGroupuser(CreateGroupuserDto: CreateGroupuserDto)
	{
		const newGroupuser = this.groupuserRepository.create(CreateGroupuserDto);
		newGroupuser.userType = 0;
		return this.groupuserRepository.save(newGroupuser);
	}
}
