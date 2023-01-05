import { IsNotEmpty } from "class-validator";

export class IntraDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  username: string;
}
