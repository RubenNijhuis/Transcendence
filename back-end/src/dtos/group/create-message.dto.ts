import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  group_id: number; //TODO: hoe slaan we groupID op in de frontend? (via user?)

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  content_type: number;

  @IsNotEmpty()
  senderID: string;
}
