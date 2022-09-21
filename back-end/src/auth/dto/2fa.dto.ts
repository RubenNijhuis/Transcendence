import { IsNotEmpty } from "class-validator";

export class twoFaDto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    twoFactorAuthenticationCode: string
}