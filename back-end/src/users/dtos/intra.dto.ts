import { IsNotEmpty } from "class-validator";

export class IntraDto {
    @IsNotEmpty()
    intra_id: string

    @IsNotEmpty()
    username: string
}