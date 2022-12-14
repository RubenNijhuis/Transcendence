import { IsNotEmpty } from "class-validator";

export class EditMembersDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  users: string[];
}
