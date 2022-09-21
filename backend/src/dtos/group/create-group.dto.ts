import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
	@IsNotEmpty()
	owner: number

	@IsNotEmpty()
	users: number[]
}
