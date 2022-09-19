import { IsNotEmpty, MinLength } from "class-validator";

export class EditPasswordDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	owner: string

	@IsNotEmpty()
	oldPassword: string

	@IsNotEmpty()
	newPassword: string
}