import { IsNotEmpty } from "class-validator";

export class CreateFriensdDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  friendname: string;
}
