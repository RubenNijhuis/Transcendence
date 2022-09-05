import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  intraID: string
  
  @IsNotEmpty()
  username: string
}
