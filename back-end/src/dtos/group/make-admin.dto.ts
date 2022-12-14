import { NumericLimit } from "argon2";
import { IsNotEmpty, MinLength } from "class-validator";

export class MakeAdminDto {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  group: string;

  @IsNotEmpty()
  level: number;
}
