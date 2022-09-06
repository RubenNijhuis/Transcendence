import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "src/typeorm"
import { CreateGroupDto } from "./dtos/create-group.dto";
import { CreatePasswordDto } from "./dtos/create-password.dto";
import { UserNameOptions } from "@ngneat/falso/lib/user-name";
import { EditPasswordDto } from "./dtos/edit-password.dto";

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private readonly groupRepository: Repository<Group>
    ) {}

    getAllMessages() {
        return this.groupRepository.find();
    }

    findGroupById(id: number) {
        return this.groupRepository.findOne({ where: { id } });
    }

    async createPassword(CreatePasswordDto: CreatePasswordDto) {
        const group = this.findGroupById(CreatePasswordDto.id);
        if (!group) return console.error(); //error lmao
        const owner = (await group).owner;
        if (owner === CreatePasswordDto.owner)
            await this.groupRepository.update(
                CreatePasswordDto.id,
                CreatePasswordDto
            );
    }

    async updatePassword(EditPasswordDto: EditPasswordDto) {
        const group = this.findGroupById(EditPasswordDto.id);
        if (!group) return console.error(); //error lmao
        const owner = (await group).owner;
        const oldPassword = (await group).password;
        if (
            owner === EditPasswordDto.owner &&
            oldPassword === EditPasswordDto.oldPassword
        )
            return await this.groupRepository
                .createQueryBuilder()
                .update()
                .set({ password: EditPasswordDto.newPassword })
                .where({
                    id: EditPasswordDto.id
                })
                .execute();
    }

    createGroup(CreateGroupDto: CreateGroupDto) {
        const newGroup = this.groupRepository.create(CreateGroupDto);
        return this.groupRepository.save(newGroup);
    }
}