import { IsNotEmpty } from "class-validator";

export class TfaDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    tfaCode: string
}