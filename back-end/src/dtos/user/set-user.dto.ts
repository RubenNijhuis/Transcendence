import { isNotEmpty, IsNotEmpty, MinLength } from "class-validator";

export class SetUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  description: string;
}
