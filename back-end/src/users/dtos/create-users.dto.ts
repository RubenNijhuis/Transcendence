import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  description: string;
}
