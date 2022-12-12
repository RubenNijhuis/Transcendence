import { IsNotEmpty } from "class-validator";

export class EditMembersDto {
  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty()
  users: string[];
}
