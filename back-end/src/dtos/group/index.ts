import { MakeAdminDto } from "./make-admin.dto";
import { CreateGroupDto } from "./create-group.dto";
import { CreateMessageDto } from "./create-message.dto";
import { EditOwnerDto } from "./edit-owner.dto";
import { SetPasswordDto } from "./set-password.dto";

const chatDtos = [
  CreateMessageDto,
  CreateGroupDto,
  MakeAdminDto,
  EditOwnerDto,
  SetPasswordDto
];

export {
  CreateMessageDto,
  CreateGroupDto,
  MakeAdminDto,
  EditOwnerDto,
  SetPasswordDto
};

export default chatDtos;
