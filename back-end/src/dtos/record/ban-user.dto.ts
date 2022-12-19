import { IsNotEmpty, IsOptional } from "class-validator";

export class BanUserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty() //TODO debatable if this is necessary
  type: number;

  @IsOptional()
  timeToBan: number;
}
