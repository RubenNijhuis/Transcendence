import { CreateAdminDto } from "./create-admin.dto";
import { CreateGroupDto } from "./create-group.dto";
import { CreateMessageDto } from "./create-message.dto";
import { CreatePasswordDto } from "./create-password.dto";
import { EditGroupDto } from "./edit-group.dto";
import { EditPasswordDto } from "./edit-password.dto";
declare const chatDtos: (typeof CreateAdminDto | typeof CreateMessageDto | typeof CreateGroupDto | typeof CreatePasswordDto | typeof EditGroupDto | typeof EditPasswordDto)[];
export { CreateMessageDto, CreateGroupDto, CreateAdminDto, CreatePasswordDto, EditGroupDto, EditPasswordDto };
export default chatDtos;
