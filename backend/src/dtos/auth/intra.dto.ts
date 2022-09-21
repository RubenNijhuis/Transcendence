import { IsNotEmpty } from "class-validator";

export class IntraDto {
    @IsNotEmpty()
    intraID: string

    @IsNotEmpty()
    username: string
}