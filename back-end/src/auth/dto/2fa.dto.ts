import { IsNotEmpty } from "class-validator";

export class twofadto {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    twoFactorAuthenticationCode: string
}