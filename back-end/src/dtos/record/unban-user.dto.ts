import { IsNotEmpty } from "class-validator";

export class UnBanUserDto {
  @IsNotEmpty()
  memberId: string;

  @IsNotEmpty()
  groupId: string;
}
