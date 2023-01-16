import { IsNotEmpty, IsOptional } from "class-validator";

export class BanUserDto {
  @IsNotEmpty()
  memberId: string;

  @IsNotEmpty()
  groupId: string;

  @IsOptional()
  timeToBan: number;
}
