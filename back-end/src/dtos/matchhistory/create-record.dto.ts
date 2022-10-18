import { IsNotEmpty } from "class-validator";

export class CreateRecordDto {
  @IsNotEmpty()
  playerOne: string;

  @IsNotEmpty()
  playerTwo: string;

  @IsNotEmpty()
  scoreOne: number;

  @IsNotEmpty()
  scoreTwo: number;

  @IsNotEmpty()
  scoreType: number;

  @IsNotEmpty()
  gameType: number;
}
