import { isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateGroupDto {
	@IsNotEmpty()
	groupId: number;

	@IsNotEmpty()
	owner: number;
}
