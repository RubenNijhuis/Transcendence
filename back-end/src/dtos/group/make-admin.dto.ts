import { IsNotEmpty, MinLength } from "class-validator";

export class MakeAdminDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  group: number;
}
