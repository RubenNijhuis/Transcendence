import { IsNotEmpty } from "class-validator";

export class SetDescriptionDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  description: string;
}
