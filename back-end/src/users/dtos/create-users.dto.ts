import { IsHexColor, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}
