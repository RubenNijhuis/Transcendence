import { IsNotEmpty } from "class-validator";

export class CreateFriendsDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  friendname: string;
}
