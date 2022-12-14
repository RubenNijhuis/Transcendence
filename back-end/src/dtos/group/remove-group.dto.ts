import { IsNotEmpty } from "class-validator";

export class RemoveGroupDto {
	@IsNotEmpty()
	groupId: string;

	@IsNotEmpty()
	owner: string;
}
