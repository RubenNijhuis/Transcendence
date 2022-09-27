import { isBoolean, IsNotEmpty } from "class-validator";

export class SetTfaDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  option: boolean;
}
