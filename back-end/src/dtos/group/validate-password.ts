import { IsNotEmpty } from "class-validator";

export class ValidatePasswordDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  password: string;
}