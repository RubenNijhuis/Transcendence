import { IsNotEmpty, MinLength } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    group_id: string;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    content_type: number;

    @IsNotEmpty()
    sender: string;
}
