import { IsNotEmpty } from "class-validator";

export class ValidatePasswordDto {
  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  password: string;
}
