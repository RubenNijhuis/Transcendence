import { IsNotEmpty } from "class-validator";

export class UsernameDto {
  @IsNotEmpty()
  username: string;
}
