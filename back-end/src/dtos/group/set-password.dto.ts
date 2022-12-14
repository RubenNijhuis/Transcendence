import { IsNotEmpty } from "class-validator";

export class SetPasswordDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;
}
