import { IsNotEmpty } from "class-validator";

export class intraDto {
    @IsNotEmpty()
    intra_id: string

    @IsNotEmpty()
    username: string
}