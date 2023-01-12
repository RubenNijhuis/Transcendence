import { IsNotEmpty, IsOptional } from "class-validator";

export class BanUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  groupId: string;

  @IsOptional()
  timeToBan: number;
}
