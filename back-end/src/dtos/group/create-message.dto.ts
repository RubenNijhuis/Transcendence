import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  group_id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  content_type: number;
}
