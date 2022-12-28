import { IsNotEmpty } from "class-validator";

export class SetPasswordDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  password: string;
}
