import { IsNotEmpty } from "class-validator";

export class TfaDto {
  @IsNotEmpty()
  intraID: string;

  @IsNotEmpty()
  tfaCode: string;
}
