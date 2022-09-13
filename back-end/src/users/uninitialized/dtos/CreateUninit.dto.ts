import { IsNotEmpty } from "class-validator";

export class CreateUninitDto {
    @IsNotEmpty()
    intraId: string
}