import { IsNotEmpty, MinLength } from "class-validator";

export class EditOwnerDto {
	@IsNotEmpty()
	groupId: number

	@IsNotEmpty()
	owner: number
}
