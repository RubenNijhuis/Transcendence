import { IsNotEmpty } from "class-validator";

export class BanUserDto {
  @IsNotEmpty()
  admin: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty() //TODO debatable if this is necessary
  type: number;

  @IsNotEmpty()
  timeToBan: number;
}
