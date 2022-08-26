import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  uid: string;
  
  @IsNotEmpty()
  username: string;
}
