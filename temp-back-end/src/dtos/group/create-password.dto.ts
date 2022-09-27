import { IsNotEmpty } from "class-validator";

export class CreatePasswordDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	owner: number

	@IsNotEmpty()
	password: string
}
