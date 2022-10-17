import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  groupname: string;

  @IsNotEmpty()
  users: string[];
}
