import { IsNotEmpty } from "class-validator";

export class IsBannedDto {
  @IsNotEmpty()
  memberId: string;

  @IsNotEmpty()
  groupId: string;
}
