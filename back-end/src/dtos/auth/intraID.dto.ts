import { IsNotEmpty } from "class-validator";

export class intraIDDto {
  @IsNotEmpty()
  intraID: string;
}
