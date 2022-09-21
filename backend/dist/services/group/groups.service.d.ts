import { CreateAdminDto, EditGroupDto } from "src/dtos/chat";
import Group from "src/entities/group/group.entity";
import { Repository } from "typeorm";
import { CreateGroupDto } from "../../dtos/chat/create-group.dto";
import { CreatePasswordDto } from "../../dtos/chat/create-password.dto";
import { EditPasswordDto } from "../../dtos/chat/edit-password.dto";
import Groupuser from "../../entities/groupuser/groupuser.entity";
import { UserService } from "../user/user.service";
export declare class GroupService {
    private readonly groupRepository;
    private readonly groupuserRepository;
    private readonly userService;
    constructor(groupRepository: Repository<Group>, groupuserRepository: Repository<Groupuser>, userService: UserService);
    getAllMessages(): Promise<Group[]>;
    findGroupById(id: number): Promise<Group>;
    createPassword(createPasswordDto: CreatePasswordDto): Promise<void>;
    updatePassword(editPasswordDto: EditPasswordDto): Promise<void | import("typeorm").UpdateResult>;
    createGroup(createGroupDto: CreateGroupDto): Promise<Group>;
    addMembers(editGroupDto: EditGroupDto): Promise<void>;
    removeMembers(editGroupDto: EditGroupDto): Promise<void>;
    makeAdmin(createAdminDto: CreateAdminDto): Promise<Groupuser>;
    unMakeAdmin(createAdminDto: CreateAdminDto): Promise<Groupuser>;
}
