import { IsNotEmpty, MinLength } from "class-validator";

export class EditMembersDto {
	@IsNotEmpty()
	groupId: number

	@IsNotEmpty()
	users: number[]
}
