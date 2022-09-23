import { IsNotEmpty } from "class-validator";

export class UploadImgDto {
  @IsNotEmpty()
  intraId: string;

  @IsNotEmpty()
  type: string;
}
