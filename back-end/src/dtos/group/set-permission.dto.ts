import { IsNotEmpty } from "class-validator";

export class SetPermissionDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  group: string;

  @IsNotEmpty()
  level: number;
}
