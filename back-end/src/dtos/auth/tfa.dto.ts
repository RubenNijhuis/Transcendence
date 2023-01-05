import { IsNotEmpty } from "class-validator";

export class TfaDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  tfaCode: string;
}
