import { IsNotEmpty } from "class-validator";

export class UserOppDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    selectedUsername: string
}