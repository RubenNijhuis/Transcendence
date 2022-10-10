import { IsNotEmpty } from "class-validator";

export class MuteUserDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	user: string

}
