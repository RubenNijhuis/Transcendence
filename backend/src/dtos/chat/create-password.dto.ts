import { IsNotEmpty } from "class-validator";

export class CreatePasswordDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	owner: string

	@IsNotEmpty()
	password: string
}
