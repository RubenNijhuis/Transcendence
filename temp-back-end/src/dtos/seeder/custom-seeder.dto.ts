import { IsNotEmpty } from "class-validator";

export class SeederAmountDto {
  @IsNotEmpty()
  amount: number
}