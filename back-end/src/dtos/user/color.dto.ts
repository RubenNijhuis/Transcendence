import { IsNotEmpty } from "class-validator";

export class SetcolorDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  color: string;
}
