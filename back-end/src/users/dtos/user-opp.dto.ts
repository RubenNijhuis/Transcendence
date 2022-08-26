import { IsNotEmpty, isNotEmpty } from "class-validator";

export class UserOppDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    friend: string
}