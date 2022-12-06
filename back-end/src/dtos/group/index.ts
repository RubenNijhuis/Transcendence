import { MakeAdminDto } from "./make-admin.dto";
import { CreateGroupDto } from "./create-group.dto";
import { CreateMessageDto } from "./create-message.dto";
import { CreatePasswordDto } from "./set-password";
import { EditOwnerDto } from "./edit-owner.dto";
import { EditPasswordDto } from "./edit-password.dto";

const chatDtos = [
  CreateMessageDto,
  CreateGroupDto,
  MakeAdminDto,
  CreatePasswordDto,
  EditOwnerDto,
  EditPasswordDto
];

export {
  CreateMessageDto,
  CreateGroupDto,
  MakeAdminDto,
  CreatePasswordDto,
  EditOwnerDto,
  EditPasswordDto
};

export default chatDtos;
