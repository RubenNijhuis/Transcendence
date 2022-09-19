import { IsNotEmpty } from "class-validator";

export class TwoFaDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    TFACode: string
}