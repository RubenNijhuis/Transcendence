import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  uid: any;
  
  @IsNotEmpty()
  @MinLength(3)
  username: any;
}