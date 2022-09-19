import { IsNotEmpty, MinLength } from "class-validator";

export class EditGroupDto {
	@IsNotEmpty()
	groupId: number

	@IsNotEmpty()
	users: number[]
}
