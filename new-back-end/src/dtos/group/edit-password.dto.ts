import { IsNotEmpty, MinLength } from "class-validator";

export class EditPasswordDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  owner: number;

  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
