import { CreateAdminDto, EditGroupDto } from "src/dtos/chat";
import { GroupService } from "src/services/group/groups.service";
import { CreateGroupDto } from "../../dtos/chat/create-group.dto";
import { CreatePasswordDto } from "../../dtos/chat/create-password.dto";
import { EditPasswordDto } from "../../dtos/chat/edit-password.dto";
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    getAllMessages(): Promise<import("../../entities/group/group.entity").Group[]>;
    createPassword(CreatePasswordDto: CreatePasswordDto): Promise<any>;
    updatePassword(editPasswordDto: EditPasswordDto): Promise<any>;
    createGroup(createGroupDto: CreateGroupDto): Promise<any>;
    addMembers(editGroupDto: EditGroupDto): Promise<any>;
    removeMembers(editGroupDto: EditGroupDto): Promise<any>;
    makeAdmin(createAdminDto: CreateAdminDto): Promise<any>;
    unMakeAdmin(createAdminDto: CreateAdminDto): Promise<any>;
}
