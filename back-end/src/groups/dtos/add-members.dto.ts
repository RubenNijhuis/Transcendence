import { IsNotEmpty, MinLength } from "class-validator";

export class AddMembersDto {
	@IsNotEmpty()
	id: number

	@IsNotEmpty()
	users: number[]
}
