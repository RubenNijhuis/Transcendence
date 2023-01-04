import { IsNotEmpty } from "class-validator";

export class CreateRequestDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  requested: string;
}
