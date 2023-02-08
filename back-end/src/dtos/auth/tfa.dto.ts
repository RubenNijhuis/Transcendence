import { IsNotEmpty } from "class-validator";

export class TfaDto {
  @IsNotEmpty()
  tfaCode: string;
}
