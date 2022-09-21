import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  group_id: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  content_type: number;

  @IsNotEmpty()
  sender: number;
}
