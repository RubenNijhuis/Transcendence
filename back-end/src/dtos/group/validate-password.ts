import { IsNotEmpty } from "class-validator";

export class ValidatePasswordDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;
}