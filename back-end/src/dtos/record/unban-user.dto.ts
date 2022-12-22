import { IsNotEmpty, IsOptional } from "class-validator";

export class UnBanUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  groupId: string;
}
