import { IsNotEmpty } from "class-validator";

export class RemoveGroupDto {
	@IsNotEmpty()
	groupId: number;

	@IsNotEmpty()
	owner: string;
}
