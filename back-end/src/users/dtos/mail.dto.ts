import { IsNotEmpty } from "class-validator";

export class MailDto {
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    email: string
}

