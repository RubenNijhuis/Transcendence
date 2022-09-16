import { IsNotEmpty } from "class-validator";

export class uploadImgDto {
    @IsNotEmpty()
    intraId: string
    
    @IsNotEmpty()
    type: string
}