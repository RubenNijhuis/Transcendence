import { IsNotEmpty, MinLength } from "class-validator";

export class EditMembersDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	users: number[]
}
