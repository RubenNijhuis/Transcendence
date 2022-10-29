import { isBoolean, IsNotEmpty } from "class-validator";

export class SetTfaDto {
  @IsNotEmpty()
  uid: string;
}
