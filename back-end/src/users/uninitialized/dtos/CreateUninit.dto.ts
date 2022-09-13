import { IsNotEmpty } from "class-validator";

export class CreateUninitDto {
    @IsNotEmpty()
    intraID: string
}