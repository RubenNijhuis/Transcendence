import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  users: string[];
}
