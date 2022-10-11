import { isNotEmpty, IsNotEmpty, MinLength } from "class-validator";

export class GetImgDto {
  @IsNotEmpty()
  type: string;
}
