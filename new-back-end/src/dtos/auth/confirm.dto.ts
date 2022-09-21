import { IsNotEmpty } from "class-validator";

export class ConfirmDto {
  @IsNotEmpty()
  token: string;
}
