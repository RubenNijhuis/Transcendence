import { IsNotEmpty } from "class-validator";

export class SetPasswordDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  password: string;
}
