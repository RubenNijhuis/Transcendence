import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  authToken: string

  @IsNotEmpty()
  intraId: string
  
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  color: string
}
