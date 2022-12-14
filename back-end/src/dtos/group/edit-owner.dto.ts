import { IsNotEmpty, MinLength } from "class-validator";

export class EditOwnerDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  owner: string;
}
