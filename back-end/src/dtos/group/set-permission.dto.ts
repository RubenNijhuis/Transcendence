import { IsNotEmpty } from "class-validator";

export class SetPermissionDto {
  @IsNotEmpty()
  targetUser: string;

  @IsNotEmpty()
  groupId: string;

  @IsNotEmpty()
  level: number;
}
