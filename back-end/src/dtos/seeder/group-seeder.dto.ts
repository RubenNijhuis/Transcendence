import { IsNotEmpty } from "class-validator";

export class SeederGroupDto {
  @IsNotEmpty()
  username: string
}